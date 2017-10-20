const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead onSubmit Callback Tests', () => {
    'use strict';

    let myTypeahead,
        onSubmitCalled,
        onSubmitItem;

    let enterEvent = $.Event("keydown");
    enterEvent.keyCode = 13;

    beforeAll(() => {

        document.body.innerHTML = `<form>
            <div class="typeahead__container">
                <div class="typeahead__field">
                    <div class="typeahead__query">
                        <input class="js-typeahead"
                               name="q"
                               type="search"
                               autofocus
                               autocomplete="off">
                    </div>
                    <div class="typeahead__button">
                        <button type="submit">
                            <span class="typeahead__search-icon"></span>
                        </button>
                    </div>
                </div>
            </div>
        </form>`;

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            minLength: 0,
            source: [
                {
                    id: 1,
                    display: "Test"
                },
                {
                    id: 2,
                    display: "callback"
                }
            ],
            callback: {
                onSubmit: function (node, form, item, event) {
                    event.preventDefault();

                    onSubmitCalled = true;
                    onSubmitItem = item;
                }
            }
        });
    });

    it('Should call onSubmit callback with with the selected item', () => {
        myTypeahead.node.val('test').trigger('input');

        myTypeahead.resultContainer.find('li:eq(0) a').trigger('click');

        expect(myTypeahead.container.hasClass('result')).toBeFalsy();

        myTypeahead.node.trigger(enterEvent);

        expect(onSubmitCalled).toBeTruthy();
        expect(onSubmitItem).toEqual({
            "display": "Test",
            "group": "group",
            "id": 1,
            "matchedKey": "display"
        });

        expect(myTypeahead.container.hasClass('result')).toBeFalsy();

    });
});


describe('Typeahead onSubmit Callback Tests', () => {
    'use strict';

    let myTypeahead,
        onSubmitCalled,
        onSubmitItem;

    beforeAll(() => {

        document.body.innerHTML = `<form>
            <div class="typeahead__container">
                <div class="typeahead__field">
                    <div class="typeahead__query">
                        <input class="js-typeahead"
                               name="q"
                               type="search"
                               autofocus
                               autocomplete="off">
                    </div>
                    <div class="typeahead__button">
                        <button type="submit">
                            <span class="typeahead__search-icon"></span>
                        </button>
                    </div>
                </div>
            </div>
        </form>`;

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            minLength: 0,
            multiselect: {
                data: [
                    {
                        id: 1,
                        display: "Test"
                    },
                    {
                        id: 2,
                        display: "callback"
                    }
                ]
            },
            source: [
                {
                    id: 1,
                    display: "Test"
                },
                {
                    id: 2,
                    display: "callback"
                }
            ],
            callback: {
                onSubmit: function (node, form, item, event) {
                    event.preventDefault();

                    onSubmitCalled = true;
                    onSubmitItem = item;
                }
            }
        });
    });

    it('Should call onSubmit callback with with the selected item', () => {

        myTypeahead.node.closest('form').submit();

        expect(onSubmitCalled).toBeTruthy();
        expect(onSubmitItem).toEqual([
            {"display": "Test", "id": 1},
            {"display": "callback", "id": 2}
        ]);

        expect(myTypeahead.container.hasClass('result')).toBeFalsy();

    });
});
