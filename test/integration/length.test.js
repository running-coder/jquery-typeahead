const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead displays result according to input length per group', () => {

    let myTypeahead;

    beforeAll(() => {

        document.body.innerHTML = '<input class="js-typeahead">';

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            template: function () {
                return "{{display}}"
            },
            source: {
                group1: {
                    minLength: 0,
                    maxLength: 2,
                    data: [
                        'group1-data1',
                        'group1-data2',
                        'group1-data3'
                    ]
                },
                group2: {
                    minLength: 1,
                    data: [
                        'group2-data1',
                        'group2-data2',
                        'group2-data3'
                    ]
                },
                group3: {
                    minLength: 0,
                    data: [
                        'group3-data1',
                        'group3-data2',
                        'group3-data3'
                    ]
                },
                group4: {
                    maxLength: 3,
                    data: [
                        'group4-data1',
                        'group4-data2',
                        'group4-data3'
                    ]
                },
                group5: {
                    minLength: 0,
                    maxLength: 3,
                    data: [
                        'group5-data1',
                        'group5-data2',
                        'group5-data3'
                    ]
                }
            }
        });
    });

    it('Should assign the proper Typeahead selector', () => {

        myTypeahead.node.val('');
        myTypeahead.node.trigger('input');

        expect(myTypeahead.searchGroups).toEqual(['group1', 'group3', 'group5']);

        myTypeahead.node.val('g');
        myTypeahead.node.trigger('input');

        expect(myTypeahead.searchGroups).toEqual(['group1', 'group2', 'group3', 'group5']);

        myTypeahead.node.val('gr');
        myTypeahead.node.trigger('input');

        expect(myTypeahead.searchGroups).toEqual(['group1', 'group2', 'group3', 'group4', 'group5']);

        myTypeahead.node.val('group');
        myTypeahead.node.trigger('input');

        expect(myTypeahead.searchGroups).toEqual(['group2', 'group3']);

    });

    afterAll(() => {
        delete window.Typeahead['.js-typeahead'];
    });

});