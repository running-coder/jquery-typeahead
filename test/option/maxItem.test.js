const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead maxItem option Tests', () => {
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
            source: {
                group4: {
                    data: ['group4-data1', 'group4-data2', 'group4-data3', 'group4-data4']
                },
                group1: {
                    data: ['group1-data1', 'group1-data2', 'group1-data3', 'group1-data4']
                },
                group2: {
                    data: ['group2-data1', 'group2-data2', 'group2-data3', 'group2-data4']
                },
                group3: {
                    data: ['group3-data1', 'group3-data2', 'group3-data3', 'group3-data4']
                },

            }
        });

    });

    it('Should display 8 results from the first 3 groups', () => {
        expect(myTypeahead.result.length).toEqual(8);
        expect(myTypeahead.result).toEqual([
            {
                display: 'group4-data1',
                group: 'group4',
                matchedKey: 'display'
            },
            {
                display: 'group4-data2',
                group: 'group4',
                matchedKey: 'display'
            },
            {
                display: 'group4-data3',
                group: 'group4',
                matchedKey: 'display'
            },
            {
                display: 'group1-data1',
                group: 'group1',
                matchedKey: 'display'
            },
            {
                display: 'group1-data2',
                group: 'group1',
                matchedKey: 'display'
            },
            {
                display: 'group1-data3',
                group: 'group1',
                matchedKey: 'display'
            },
            {
                display: 'group2-data1',
                group: 'group2',
                matchedKey: 'display'
            },
            {
                display: 'group2-data2',
                group: 'group2',
                matchedKey: 'display'
            },
        ]);
    });
});
