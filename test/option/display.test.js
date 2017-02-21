const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead display option Tests', () => {
    'use strict';

    let myTypeahead;

    describe('Search for a deep key', () => {
        
        beforeAll(() => {

            document.body.innerHTML = '<input class="js-typeahead">';

            myTypeahead = $.typeahead({
                input: '.js-typeahead',
                minLength: 0,
                generateOnLoad: true,
                display: ['string','numeric', 'booleanT', 'booleanF', 'undefined', 'deeper.key.level'],
                source: {
                    data: [{
                        string: 'string',
                        numeric: 12345,
                        booleanT: true,
                        booleanF: false,
                        deeper: {
                            key: {
                                level: 42
                            }
                        }
                    }]
                }
            });

        });

        it('Should resolve a deep key inside the source data', () => {

            myTypeahead.node.val('42');
            myTypeahead.node.trigger('input');

            expect(myTypeahead.result.length).toEqual(1);

        });

    });
});
