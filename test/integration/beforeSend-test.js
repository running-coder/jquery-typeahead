var expect = require('chai').expect,
    jQuery = $ = require("jquery"),
    Typeahead = require('../../src/jquery.typeahead')(jQuery, window);

describe('Typeahead beforeSend Tests', function () {
    'use strict';

    let myTypeahead;

    describe('request.beforeSend as an Object', function () {
        before(function () {

            document.write('<input class="js-typeahead-before-send-object">');

            myTypeahead = $.typeahead({
                input: '.js-typeahead-before-send-object',
                minLength: 0,
                generateOnLoad: true,
                source: {
                    url: "http://www.gamer-hub.com/tag/list.json",
                    dataType: "jsonp",
                    beforeSend: function (jqXHR, options) {
                    }
                }
            });
        });

        it('should preserve Typeahead request.beforeSend Function', function () {
            myTypeahead.node.val('test');
            myTypeahead.node.trigger('input.typeahead');

            expect(!!~myTypeahead.requests.group.request.beforeSend.toString().indexOf('scope.xhr[group] = jqXHR;')).to.be.true;
        });
    });

    describe('request.beforeSend as an Array', function () {
        before(function () {

            document.write('<input class="js-typeahead-before-send-array">');

            myTypeahead = $.typeahead({
                input: '.js-typeahead-before-send-array',
                minLength: 0,
                generateOnLoad: true,
                highlight: true,
                source: {
                    url: [function (query) {
                        return {
                            url: "http://www.gamer-hub.com/tag/list.json",
                            dataType: "jsonp",
                            beforeSend: function (jqXHR, options) {
                            }
                        }
                    }, "data"]
                }
            });
        });

        it('should preserve Typeahead request.beforeSend Function', function () {
            myTypeahead.node.val('test');
            myTypeahead.node.trigger('input.typeahead');

            expect(!!~myTypeahead.requests.group.request.beforeSend.toString().indexOf('scope.xhr[group] = jqXHR;')).to.be.true;
        });
    });

});
