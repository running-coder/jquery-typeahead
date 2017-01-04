var expect = require('chai').expect,
    $ = require("jquery"),
    Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead Callback Tests', function () {
    'use strict';

    let myTypeahead,
        onCancel;

    before(function () {

        document.write('<input class="js-typeahead-callback">');

        myTypeahead = $.typeahead({
            input: '.js-typeahead-callback',
            minLength: 0,
            generateOnLoad: true,
            display: ['display'],
            template: '{{display}} {{details}}',
            emptyTemplate: "no result for {{query}}",
            source: [
                {
                    "id": "1",
                    "display": "Test"
                },
                {
                    "id": "2",
                    "display": "callback"
                }
            ],
            callback: {
                onCancel: function (node, event) {
                    onCancel = true;
                }
            }
        });
    });

    beforeEach(() => {
        onCancel = false
    });

    it('Should call onCancel callback when ESC is pressed', function () {
        myTypeahead.node.val('test');
        myTypeahead.node.trigger('input.typeahead');

        myTypeahead.node.trigger($.Event("keydown", { keyCode: 27 }));
        expect(onCancel).to.be.true;
    });

    it('Should call onCancel callback if cancel button is clicked', function () {
        myTypeahead.node.val('test');
        myTypeahead.node.trigger('input.typeahead');

        myTypeahead.node.parent().find('.typeahead__cancel-button').trigger('mousedown')
        expect(onCancel).to.be.true;
    });

    it('Should call onCancel callback if a character is deleted and the input is empty', function () {
        myTypeahead.node.val('test');
        myTypeahead.node.trigger('input.typeahead');

        myTypeahead.node.val('');
        myTypeahead.node.trigger('input.typeahead');

        expect(onCancel).to.be.true;
    });
});
