var expect = require('chai').expect,
    jQuery = $ = require("jquery"),
    Typeahead = require('../../src/jquery.typeahead')(jQuery, window);

describe('Typeahead can display any value type Tests', function () {
    'use strict';

    let myTypeahead;

    before(function () {

        document.write('<input class="js-typeahead-any-value-type">');

        myTypeahead = $.typeahead({
            input: '.js-typeahead-any-value-type',
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

    it('Should display any value types', function () {
        myTypeahead.node.trigger('input.typeahead');

        expect(myTypeahead.resultHtml.find('span').text()).to.equal('string 12345 true false 42');
    });

    it('Should display a boolean "false" search', function () {
        myTypeahead.node.val('false');
        myTypeahead.node.trigger('input.typeahead');

        expect(myTypeahead.result.length).to.equal(1);
    });

    it('Should display a numeric value', function () {
        myTypeahead.node.val('345');
        myTypeahead.node.trigger('input.typeahead');

        expect(myTypeahead.result.length).to.equal(1);
    });
});
