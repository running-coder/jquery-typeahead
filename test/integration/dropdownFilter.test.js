const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead $.ajax.callback.done Tests', () => {

    let myTypeahead;
    const group1DoneCallback = jest.fn();
    const group2DoneCallback = jest.fn();
    const group3DoneCallback = jest.fn();

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
            input: ".js-typeahead",
            minLength: 0,
            group: true,
            maxItemPerGroup: 3,
            dynamic: true,
            dropdownFilter: "all",
            source: {
                group1: {
                    ajax: {
                        url: "http://test.com/game.json",
                        path: "data",
                        callback: {
                            done: group1DoneCallback
                        }
                    }
                },
                group2: {
                    ajax: {
                        url: "http://test.com/category.json",
                        path: "data",
                        callback: {
                            done: group2DoneCallback
                        }
                    }
                },
                group3: {
                    ajax: {
                        url: "http://test.com/tag.json",
                        path: "data",
                        callback: {
                            done: group3DoneCallback
                        }
                    }
                },
            },
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Should trigger all group callbacks', (done) => {

        myTypeahead.node.triggerHandler('input').done(function () {
            expect(myTypeahead.searchGroups).toEqual(['group1', 'group2', 'group3'])
            expect(group1DoneCallback).toHaveBeenCalled();
            expect(group2DoneCallback).toHaveBeenCalled();
            expect(group3DoneCallback).toHaveBeenCalled();
            
            done()
        });

    });

    it('Should only trigger the selected group callback', (done) => {

        let dropdownItems = myTypeahead.container.find('.' + myTypeahead.options.selector.dropdownItem);
        dropdownItems.eq(0).find('a').trigger('click');

        myTypeahead.node.triggerHandler('input').done(function () {
            expect(myTypeahead.searchGroups).toEqual(['group1']);
            expect(group1DoneCallback).toHaveBeenCalled();
            expect(group2DoneCallback).not.toHaveBeenCalled();
            expect(group3DoneCallback).not.toHaveBeenCalled();
            
            done()
        });

    });

});
