var expect = require('chai').expect,
    $ = require("jquery"),
    Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead request Tests', function () {
    'use strict';

    let myTypeahead,
        hasBeforeSend = false,
        hasComplete = false,
        hasDone = false,
        hasFail = false,
        hasThen = false,
        hasAlways = false;

    describe('$ajax.request as an Object', function () {

        before(function (done) {

            document.write('<input class="js-typeahead-request-object">');

            myTypeahead = $.typeahead({
                input: '.js-typeahead-request-object',
                minLength: 0,
                generateOnLoad: true,
                dynamic: true,
                source: {
                    ajax: {
                        url: "http://www.gamer-hub.com/tag/list.json",
                        dataType: "jsonp",
                        path: "data",
                        beforeSend: function (jqXHR, options) {
                            hasBeforeSend = true;
                        },
                        complete: function () {
                            hasComplete = true;
                            setTimeout(function(){
                                done();
                            }, 250);
                        },
                        callback: {
                            done: function (data) {
                                hasDone = true;
                                if (this.query == "q") {
                                    data.data[0].newKey = 'newKey';
                                }
                                return data;
                            },
                            fail: function () {
                                hasFail = true;
                            },
                            then: function () {
                                hasThen = true;
                            },
                            always: function () {
                                hasAlways = true;
                            }
                        }
                    }
                }
            });
        });

        it('should merge Typeahead $.ajax object', function () {
            expect(myTypeahead.source.group.length).to.be.above(100);
            expect(hasBeforeSend).to.be.true;
            expect(hasComplete).to.be.true;
            expect(hasDone).to.be.true;
            expect(hasFail).to.be.false;
            expect(hasThen).to.be.true;
            expect(hasAlways).to.be.true;
            expect(!!~myTypeahead.requests.group.request.beforeSend.toString().indexOf('scope.xhr[group] = jqXHR;')).to.be.true;
        });

        it('should have modified the data object `from callback.done` if query == q', function () {
            myTypeahead.node.val('q');
            myTypeahead.node.trigger('input.typeahead');
            expect(myTypeahead.result[0].newKey).to.be.defined;
            expect(myTypeahead.result[0].invalidKey).to.not.be.defined;
        });

        it('shouldn\'t have modified the data object `from callback.done`', function () {
            myTypeahead.node.val('test');
            myTypeahead.node.trigger('input.typeahead');
            expect(myTypeahead.result[0].newKey).to.not.be.defined;
        });
    });

    describe('$ajax.request as an Array', function () {
        before(function (done) {

            hasBeforeSend = false;
            hasComplete = false;
            hasDone = false;
            hasFail = false;
            hasThen = false;
            hasAlways = false;

            document.write('<input class="js-typeahead-request-array">');

            myTypeahead = $.typeahead({
                input: '.js-typeahead-request-array',
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
                            complete: function () {
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
                                fail: function () {
                                    hasFail = true;
                                },
                                then: function () {
                                    hasThen = true;
                                },
                                always: function () {
                                    hasAlways = true;
                                }
                            }
                        }
                    }, "data"]
                }
            });
        });

        it('should merge Typeahead Array into $.ajax object', function () {
            myTypeahead.node.val('test');
            myTypeahead.node.trigger('input.typeahead');
            myTypeahead.node.trigger('generate.typeahead');

            expect(!!~myTypeahead.requests.group.request.url.indexOf('?q=test')).to.be.true;
            expect(myTypeahead.source.group.length).to.be.above(100);
            expect(hasBeforeSend).to.be.true;
            expect(hasComplete).to.be.true;
            expect(hasDone).to.be.true;
            expect(hasFail).to.be.false;
            expect(hasThen).to.be.true;
            expect(hasAlways).to.be.true;
            expect(!!~myTypeahead.requests.group.request.beforeSend.toString().indexOf('scope.xhr[group] = jqXHR;')).to.be.true;
        });
    });

    // #271 Data is cached inside the xhrObject
    describe('$ajax.request should have variable GET data', function () {
        before(function () {

            document.write('<input class="js-typeahead-request-data">');

            myTypeahead = $.typeahead({
                input: '.js-typeahead-request-data',
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

        it('should merge Typeahead $.ajax.data dynamically when ajax is a function', function () {
            myTypeahead.node.val('test');
            myTypeahead.node.trigger('input.typeahead');
            myTypeahead.node.trigger('generate.typeahead');

            expect(Object.keys(myTypeahead.requests.group.request.data).length).to.be.equal(2);

            myTypeahead.node.val('q');
            myTypeahead.node.trigger('input.typeahead');
            myTypeahead.node.trigger('generate.typeahead');
            expect(Object.keys(myTypeahead.requests.group.request.data).length).to.be.equal(3);

            myTypeahead.node.val('test');
            myTypeahead.node.trigger('input.typeahead');
            myTypeahead.node.trigger('generate.typeahead');

            expect(Object.keys(myTypeahead.requests.group.request.data).length).to.be.equal(2);
        });
    });

});
