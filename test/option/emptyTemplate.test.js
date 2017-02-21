const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead emptyTemplate option Tests', () => {
    'use strict';

    let myTypeahead;

    describe('String', () => {
        beforeAll(() => {

            document.body.innerHTML = '<input class="js-typeahead">';

            myTypeahead = $.typeahead({
                input: '.js-typeahead',
                minLength: 0,
                generateOnLoad: true,
                emptyTemplate: 'No result for {{query}}',
                source: {
                    data: ['test']
                }
            });
        });

        it('Should output a String', () => {
            myTypeahead.node.val('eMpTy');
            myTypeahead.node.trigger('input');

            expect(myTypeahead.resultHtml.find('li').length).toEqual(1);
            expect(myTypeahead.resultHtml.text()).toEqual('No result for eMpTy');
        });
    });

    describe('Function that returns a String', () => {
        beforeAll(() => {

            myTypeahead.options.emptyTemplate = function (query) {
                return 'No results for "' + query + '"';
            };
        });

        it('Should output a String from a Function', () => {
            myTypeahead.node.val('Empty');
            myTypeahead.node.trigger('input');

            expect(myTypeahead.resultHtml.find('li').length).toEqual(1);
            expect(myTypeahead.resultHtml.text()).toEqual('No results for "Empty"');
        });
    });

    describe('Function that returns a jQuery Object', () => {
        beforeAll(() => {

            myTypeahead.options.emptyTemplate = function (query) {
                return $('<li>', {
                    "text": "Just use \"" + query + "\"",
                    "class": "my-custom-class"
                });
            };
        });

        it('Should output a jQuery object from a Function', () => {
            myTypeahead.node.val('Empty');
            myTypeahead.node.trigger('input');

            expect(myTypeahead.resultHtml.find('li').length).toEqual(1);
            expect(myTypeahead.resultHtml.text()).toEqual('Just use "Empty"');
        });
    });

});
