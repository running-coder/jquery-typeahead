const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead can not display null or boolean if the item is a string', () => {
    'use strict';

    let myTypeahead;

    beforeAll(() => {

        document.body.innerHTML = '<input class="js-typeahead">';

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            minLength: 0,
            generateOnLoad: true,
            source: {
                data: [null, false, true, "null", "false", "true"]
            }
        });
    });

    it('Should display any value types', () => {
        myTypeahead.node.trigger('input');

        expect(myTypeahead.result.length).toEqual(3);
    });
});

describe('Typeahead can display any value type Tests from inside an object', () => {
    'use strict';

    let myTypeahead;

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

    it('Should display any value types', () => {
        myTypeahead.node.trigger('input');

        expect(myTypeahead.resultHtml.find('span').text()).toEqual('string 12345 true false 42');
    });

    it('Should display a boolean "false" search', () => {
        myTypeahead.node.val('false');
        myTypeahead.node.trigger('input');

        expect(myTypeahead.result.length).toEqual(1);
    });

    it('Should display a numeric value', () => {
        myTypeahead.node.val('345');
        myTypeahead.node.trigger('input');

        expect(myTypeahead.result.length).toEqual(1);
    });
});
