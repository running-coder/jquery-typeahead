const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead slugify', () => {
    'use strict';

    let myTypeahead;
    beforeAll(() => {

        document.body.innerHTML = '<input class="js-typeahead" />';

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            minLength: 0,
            href: "{{url|slugify}}",
            source: [
                {
                    id: 1,
                    display: "test",
                    url: "test of an url"
                },
            ]
        });
    });

    it('Should call onSubmit callback with with the selected item', () => {
        myTypeahead.node.val('test').trigger('input');

        expect(myTypeahead.resultContainer.find('a:first').attr('href')).toEqual('test-of-an-url')
    });
});
