const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead cancelButton option Tests', () => {
    let myTypeahead;

    describe('Cancel button is enabled', () => {
        
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
                minLength: 1,
                cancelButton: true,
                source: {
                    data: ['test1', 'test2', 'test3', 'test4', 'test5']
                }
            });

        });

        it('Should show/hide the cancel button when search is empty/not empty', () => {
            expect(myTypeahead.container.find(`.${myTypeahead.options.selector.cancelButton}`)).toHaveLength(1);
            expect(myTypeahead.container.hasClass('cancel')).toBeFalsy();

            myTypeahead.node.val('t');
            myTypeahead.node.trigger('input');

            expect(myTypeahead.container.hasClass('cancel')).toBeTruthy();

            myTypeahead.node.trigger($.Event("keydown", { keyCode: 8 }));

            expect(myTypeahead.container.hasClass('cancel')).toBeTruthy();
        });

        it('Should show the cancel button when an item is selected', () => {
            myTypeahead.node.val('t');
            myTypeahead.node.trigger('input');

            let items = myTypeahead.container.find('.' + myTypeahead.options.selector.item);
            items.eq(0).find('a').trigger('click');

            expect(myTypeahead.container.find(`.${myTypeahead.options.selector.cancelButton}`)).toHaveLength(1);
            expect(myTypeahead.container.hasClass('cancel')).toBeTruthy();
        });

        it('Should show the cancel button when an item is selected', () => {
            myTypeahead.node.val('t');
            myTypeahead.node.trigger('input');

            let items = myTypeahead.container.find('.' + myTypeahead.options.selector.item);
            items.eq(0).find('a').trigger('click');

            myTypeahead.node.trigger($.Event("keydown", { keyCode: 27 }));
       
            expect(myTypeahead.container.find(`.${myTypeahead.options.selector.cancelButton}`)).toHaveLength(1);
            expect(myTypeahead.container.hasClass('cancel')).toBeFalsy();
        });
    });
});
