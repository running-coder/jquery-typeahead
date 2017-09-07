const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead href option Tests', () => {
    'use strict';

    let myTypeahead;

    beforeAll(() => {

        document.body.innerHTML = '<input class="js-typeahead">';

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            generateOnLoad: true,
            minLength: 0,
            maxItem: 8,
            maxItemPerGroup: 3,
            display: ['display'],
            href: function (item) {
                return '/group/' + item.group + '/item/' + item.display;
            },
            source: {
                group1: {
                    data: [
                        'group1-data1',
                        'group1-data2',
                        'group1-data3',
                        'group1-data4'
                    ]
                },
                group2: {
                    href: '/test/{{group}}/test/{{display}}',
                    data: [
                        'group2-data1',
                        'group2-data2',
                        'group2-data3',
                        'group2-data4'
                    ]
                }
            }
        });

    });

    it('Should display a href attribute on a result item', () => {

        myTypeahead.node.val('data1').trigger('input');

        expect(myTypeahead.resultContainer.find('li:eq(0) a').attr('href')).toEqual('/group/group1/item/group1-data1');
        expect(myTypeahead.resultContainer.find('li:eq(1) a').attr('href')).toEqual('/test/group2/test/group2-data1');

    });
});