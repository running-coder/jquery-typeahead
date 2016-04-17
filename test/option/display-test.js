var expect = require('chai').expect,
    jQuery = $ = require("jquery"),
    Typeahead = require('../../src/jquery.typeahead')(jQuery, window);

describe('Typeahead display option Tests', function () {
    'use strict';

    let myTypeahead;

    describe('Search for a deep key', function () {
        
        before(function () {

            document.write('<input class="js-typeahead-display">');

            myTypeahead = $.typeahead({
                input: '.js-typeahead-display',
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

        it('Should resolve a deep key inside the source data', function () {

            myTypeahead.node.val('42');
            myTypeahead.node.trigger('input.typeahead');

            expect(myTypeahead.result.length).to.equal(1);

        });

    });
});
