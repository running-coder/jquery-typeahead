const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead Sanitize Tests', () => {
    'use strict';

    let myTypeahead;

    beforeAll(() => {

        document.body.innerHTML = '<input class="js-typeahead">';

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            minLength: 0,
            generateOnLoad: true,
            display: ['display'],
            template: '{{display}} {{details}}',
            emptyTemplate: "no result for {{query}}",
            source: [
                {
                    "id": "1",
                    "display": "Test & Sanitize",
                    "details": "\u003cscript\u003ealert('test')\u003c/script\u003e"
                },
                {
                    "id": "2",
                    "display": "More Test > Sanitize",
                    "details": "<script>alert('test')</script>"
                }
            ]
        });
    });

    it('Should display values', () => {
        myTypeahead.node.val('test');
        myTypeahead.node.trigger('input');

        expect(myTypeahead.resultCount).toEqual(2);
        expect(myTypeahead.resultHtml).toBeDefined();
        expect(/<\/?(?:script|iframe)\b[^>]*>/.test(myTypeahead.resultHtml[0].innerHTML)).toBeFalsy();
    });

    it('Should display sanitized values', () => {
        myTypeahead.node.val('<script>empty</script>');
        myTypeahead.node.trigger('input');

        expect(myTypeahead.resultCount).toEqual(0);
        expect(myTypeahead.resultHtml.text()).toEqual('no result for empty');
    });

});
