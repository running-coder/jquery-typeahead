var expect = require('chai').expect,
    jQuery = $ = require("jquery"),
    Typeahead = require('../../src/jquery.typeahead')(jQuery, window);

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

});
