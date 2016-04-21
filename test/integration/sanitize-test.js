var expect = require('chai').expect,
    jQuery = $ = require("jquery"),
    Typeahead = require('../../src/jquery.typeahead')(jQuery, window);

describe('Typeahead Sanitize Tests', function () {
    'use strict';

    let myTypeahead;

    before(function () {

        document.write('<input class="js-typeahead-sanitize">');

        myTypeahead = $.typeahead({
            input: '.js-typeahead-sanitize',
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

    it('Should display values', function () {
        myTypeahead.node.val('test');
        myTypeahead.node.trigger('input.typeahead');

        expect(myTypeahead.resultCount).to.be.equal(2);
        expect(myTypeahead.resultHtml).to.not.be.null;
        expect(/<\/?(?:script|iframe)\b[^>]*>/.test(myTypeahead.resultHtml[0].innerHTML)).to.be.false;
    });

    it('Should display sanitized values', function () {
        myTypeahead.node.val('<script>empty</script>');
        myTypeahead.node.trigger('input.typeahead');

        expect(myTypeahead.resultCount).to.be.equal(0);
        expect(myTypeahead.resultHtml.text()).to.be.equal('no result for empty');
    });

});
