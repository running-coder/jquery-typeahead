const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead request Tests', () => {
    'use strict';

    let myTypeahead,
        hasBeforeSend = false,
        hasComplete = false,
        hasDone = false,
        hasFail = false,
        hasThen = false,
        hasAlways = false;

    describe('$ajax.request as an Object', () => {

        beforeAll(function (done) {

            document.body.innerHTML = '<input class="js-typeahead">';

            myTypeahead = $.typeahead({
                input: '.js-typeahead',
                minLength: 0,
                generateOnLoad: true,
                dynamic: true,
                source: {
                    ajax: {
                        url: "http://www.gamer-hub.com/category/list.json",
                        dataType: "jsonp",
                        path: "data",
                        beforeSend: function (jqXHR, options) {
                            hasBeforeSend = true;
                        },
                        complete: () => {
                            hasComplete = true;
                            setTimeout(function(){
                                done();
                            }, 250);
                        },
                        callback: {
                            done: function (data) {
                                hasDone = true;
                                if (this.query == "sp") {
                                    data.data[0].newKey = 'newKey';
                                }
                                return data;
                            },
                            fail: () => {
                                hasFail = true;
                            },
                            then: () => {
                                hasThen = true;
                            },
                            always: () => {
                                hasAlways = true;
                            }
                        }
                    }
                }
            });
        });

        it('should merge Typeahead $.ajax object', () => {

            expect(myTypeahead.source.group.length).toBeGreaterThan(15);
            expect(hasBeforeSend).toBeTruthy();
            expect(hasComplete).toBeTruthy();
            expect(hasDone).toBeTruthy();
            expect(hasFail).toBeFalsy();
            expect(hasThen).toBeTruthy();
            expect(hasAlways).toBeTruthy();
            expect(!!~myTypeahead.requests.group.request.beforeSend.toString().indexOf('scope.xhr[group]')).toBeTruthy();

        });

        it('should have modified the data object `from callback.done` if query == q', (done) => {

            expect(myTypeahead.result[0].newKey).toBeUndefined();

            myTypeahead.node.val('sp');
            myTypeahead.node.trigger('input.typeahead');

            setTimeout(() => {
                expect(myTypeahead.result[0].newKey).toBeDefined();
                expect(myTypeahead.result[0].invalidKey).toBeUndefined();
                done();
            }, 500)

        });

    });

    describe('$ajax.request as an Array', () => {
        beforeAll(function (done) {

            hasBeforeSend = false;
            hasComplete = false;
            hasDone = false;
            hasFail = false;
            hasThen = false;
            hasAlways = false;

            document.body.innerHTML = '<input class="js-typeahead">';

            myTypeahead = $.typeahead({
                input: '.js-typeahead',
                minLength: 0,
                generateOnLoad: true,
                source: {
                    ajax: [function (query) {
                        return {
                            url: `http://www.gamer-hub.com/tag/list.json?q=${query}`,
                            dataType: "jsonp",
                            beforeSend: function (jqXHR, options) {
                                hasBeforeSend = true;
                            },
                            complete: () => {
                                hasComplete = true;
                                setTimeout(function(){
                                    done();
                                }, 250);
                            },
                            callback: {
                                done: function (data) {
                                    hasDone = true;
                                    return data;
                                },
                                fail: () => {
                                    hasFail = true;
                                },
                                then: () => {
                                    hasThen = true;
                                },
                                always: () => {
                                    hasAlways = true;
                                }
                            }
                        }
                    }, "data"]
                }
            });
        });

        it('should merge Typeahead Array into $.ajax object', () => {

            myTypeahead.node.val('test');
            myTypeahead.node.trigger('input.typeahead');
            myTypeahead.node.trigger('generate.typeahead');

            expect(!!~myTypeahead.requests.group.request.url.indexOf('?q=test')).toBeTruthy();
            expect(myTypeahead.source.group.length).toBeGreaterThan(100);
            expect(hasBeforeSend).toBeTruthy();
            expect(hasComplete).toBeTruthy();
            expect(hasDone).toBeTruthy();
            expect(hasFail).toBeFalsy();
            expect(hasThen).toBeTruthy();
            expect(hasAlways).toBeTruthy();
            expect(!!~myTypeahead.requests.group.request.beforeSend.toString().indexOf('scope.xhr[group]')).toBeTruthy();

        });
    });

    // #271 Data is cached inside the xhrObject
    describe('$ajax.request should have variable GET data', () => {
        beforeAll(() => {

            document.body.innerHTML = '<input class="js-typeahead">';

            myTypeahead = $.typeahead({
                input: '.js-typeahead',
                minLength: 0,
                generateOnLoad: true,
                source: {
                    ajax: function (query) {

                        var data = {
                            hi: 1,
                            hello: 2
                        };

                        if (query == 'q') {
                            data.hey = 3
                        }

                        return {
                            url: `http://www.gamer-hub.com/tag/list.json?q=${query}`,
                            data: data,
                            path: "data",
                            dataType: "jsonp"
                        }
                    }

                }
            });
        });

        it('should merge Typeahead $.ajax.data dynamically when ajax is a function', () => {

            myTypeahead.node.val('test');
            myTypeahead.node.trigger('input.typeahead');
            myTypeahead.node.trigger('generate.typeahead');

            expect(Object.keys(myTypeahead.requests.group.request.data).length).toEqual(2);

            myTypeahead.node.val('q');
            myTypeahead.node.trigger('input.typeahead');
            myTypeahead.node.trigger('generate.typeahead');
            expect(Object.keys(myTypeahead.requests.group.request.data).length).toEqual(3);

            myTypeahead.node.val('test');
            myTypeahead.node.trigger('input.typeahead');
            myTypeahead.node.trigger('generate.typeahead');

            expect(Object.keys(myTypeahead.requests.group.request.data).length).toEqual(2);

        });
    });

});
