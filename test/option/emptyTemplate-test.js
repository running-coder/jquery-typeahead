var expect = require('chai').expect,
    jQuery = $ = require("jquery"),
    Typeahead = require('../../src/jquery.typeahead')(jQuery, window);

describe('Typeahead emptyTemplate option Tests', function () {
    'use strict';

    let myTypeahead;

    describe('String', function () {
        before(function () {

            document.write('<input class="js-typeahead-option-empty-template">');

            myTypeahead = $.typeahead({
                input: '.js-typeahead-option-empty-template',
                minLength: 0,
                generateOnLoad: true,
                emptyTemplate: 'No result for {{query}}',
                source: {
                    data: ['test']
                }
            });
        });

        it('Should output a String', function () {
            myTypeahead.node.val('eMpTy');
            myTypeahead.node.trigger('input.typeahead');

            expect(myTypeahead.resultHtml.find('li').length).to.equal(1);
            expect(myTypeahead.resultHtml.text()).to.equal('No result for eMpTy');
        });
    });

    describe('Function that returns a String', function () {
        before(function () {

            myTypeahead.options.emptyTemplate = function (query) {
                return 'No results for "' + query + '"';
            };
        });

        it('Should output a String from a Function', function () {
            myTypeahead.node.val('Empty');
            myTypeahead.node.trigger('input.typeahead');

            expect(myTypeahead.resultHtml.find('li').length).to.equal(1);
            expect(myTypeahead.resultHtml.text()).to.equal('No results for "Empty"');
        });
    });

    describe('Function that returns a jQuery Object', function () {
        before(function () {

            myTypeahead.options.emptyTemplate = function (query) {
                return $('<li>', {
                    "text": "Just use \"" + query + "\"",
                    "class": "my-custom-class"
                });
            };
        });

        it('Should output a jQuery object from a Function', function () {
            myTypeahead.node.val('Empty');
            myTypeahead.node.trigger('input.typeahead');

            expect(myTypeahead.resultHtml.find('li').length).to.equal(1);
            expect(myTypeahead.resultHtml.text()).to.equal('Just use "Empty"');
        });
    });

});
