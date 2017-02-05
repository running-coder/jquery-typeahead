const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead onCancel Callback Tests', () => {
    'use strict';

    let myTypeahead,
        onCancel;

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

    it('Should call onCancel callback when ESC is pressed', () => {
        myTypeahead.node.val('test');
        myTypeahead.node.trigger('input');

        myTypeahead.node.trigger($.Event("keydown", { keyCode: 27 }));
        expect(onCancel).toBeTruthy();
    });

    it('Should call onCancel callback if cancel button is clicked', () => {
        myTypeahead.node.val('test');
        myTypeahead.node.trigger('input');

        myTypeahead.node.parent().find('.typeahead__cancel-button').trigger('mousedown')
        expect(onCancel).toBeTruthy();
    });

    it('Should call onCancel callback if a character is deleted and the input is empty', () => {
        myTypeahead.node.val('test');
        myTypeahead.node.trigger('input');

        myTypeahead.node.val('');
        myTypeahead.node.trigger('input');

        expect(onCancel).toBeTruthy();
    });
});
