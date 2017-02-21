const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead dropdownFilter option Tests', () => {
    'use strict';

    let myTypeahead;

    describe('Tests for boolean', () => {

        beforeAll(() => {

            document.body.innerHTML = `<div class="typeahead__container">
                                          <span class="typeahead__query">
                                              <input class="js-typeahead">
                                          </span>
                                      </div>`;

            myTypeahead = $.typeahead({
                input: '.js-typeahead',
                minLength: 0,
                maxItem: false,
                generateOnLoad: true,
                dropdownFilter: true,
                display: ['display'],
                template: '{{display}} {{details}}',
                emptyTemplate: "no result for {{query}}",
                source: {
                    group1: {
                        data: ['group1-data1', 'group1-data2', 'group1-data3']
                    },
                    group2: {
                        data: ['group2-data1', 'group2-data2', 'group2-data3']
                    },
                    group3: {
                        data: ['group3-data1', 'group3-data2', 'group3-data3']
                    }
                }
            });

        });

        it('Should create a filter for every group and one for "all"', () => {

            expect(myTypeahead.result.length).toEqual(9);

            let dropdownItems = myTypeahead.container.find('.' + myTypeahead.options.selector.dropdownItem);

            expect(dropdownItems.length).toEqual(4);
            expect(dropdownItems.eq(0).hasClass('group-group1')).toBeTruthy();
            expect(dropdownItems.eq(1).hasClass('group-group2')).toBeTruthy();
            expect(dropdownItems.eq(2).hasClass('group-group3')).toBeTruthy();
            expect(dropdownItems.eq(3).hasClass('group-all')).toBeTruthy();

        });

        it('Should filter results and only display "group1" results', () => {

            let dropdownItems = myTypeahead.container.find('.' + myTypeahead.options.selector.dropdownItem);

            dropdownItems.eq(0).find('a').trigger('click');
            expect(myTypeahead.result.length).toEqual(3);

            dropdownItems.eq(3).find('a').trigger('click');
            expect(myTypeahead.result.length).toEqual(9);

        });

        afterAll(() => {
            delete window.Typeahead['.js-typeahead'];
        });

    });

    describe('Tests for string', () => {

        beforeAll(() => {

            document.body.innerHTML = `<div class="typeahead__container">
                                          <span class="typeahead__query">
                                              <input class="js-typeahead">
                                          </span>
                                      </div>`;

            myTypeahead = $.typeahead({
                input: '.js-typeahead',
                minLength: 0,
                maxItem: false,
                generateOnLoad: true,
                dropdownFilter: "All Groups!",
                display: ['display'],
                template: '{{display}} {{details}}',
                emptyTemplate: "no result for {{query}}",
                source: {
                    group1: {
                        data: ['group1-data1', 'group1-data2', 'group1-data3']
                    },
                    group2: {
                        data: ['group2-data1', 'group2-data2', 'group2-data3']
                    },
                    group3: {
                        data: ['group3-data1', 'group3-data2', 'group3-data3']
                    }
                }
            });

        });

        it('Should create a filter for every group and one for "all"', () => {

            expect(myTypeahead.result.length).toEqual(9);

            let dropdownItems = myTypeahead.container.find('.' + myTypeahead.options.selector.dropdownItem);

            expect(dropdownItems.length).toEqual(4);
            expect(dropdownItems.eq(0).hasClass('group-group1')).toBeTruthy();
            expect(dropdownItems.eq(1).hasClass('group-group2')).toBeTruthy();
            expect(dropdownItems.eq(2).hasClass('group-group3')).toBeTruthy();
            expect(dropdownItems.eq(3).hasClass('group-all-groups')).toBeTruthy();

        });

        it('Should filter results and only display "group1" results', () => {

            let dropdownItems = myTypeahead.container.find('.' + myTypeahead.options.selector.dropdownItem);

            dropdownItems.eq(0).find('a').trigger('click');
            expect(myTypeahead.result.length).toEqual(3);

            dropdownItems.eq(3).find('a').trigger('click');
            expect(myTypeahead.result.length).toEqual(9);

        });

    });

    describe('Tests for static data - dropdownFilter as an object', () => {

        beforeAll(() => {

            document.body.innerHTML = `<div class="typeahead__container">
                                          <span class="typeahead__query">
                                              <input class="js-typeahead">
                                          </span>
                                      </div>`;

            myTypeahead = $.typeahead({
                input: '.js-typeahead',
                minLength: 0,
                maxItem: false,
                generateOnLoad: true,
                dropdownFilter: {
                    key: 'conference',
                    template: '<strong>{{conference}}</strong> Conference Teams',
                    all: 'All Conferences'
                },
                display: ['name', 'city'],
                emptyTemplate: "no result for {{query}}",
                source: {
                    teams: {
                        data: [{
                            "name": "Ducks",
                            "img": "ducks",
                            "city": "Anaheim",
                            "id": "ANA",
                            "conference": "Western",
                            "division": "Pacific"
                        }, {
                            "name": "Thrashers",
                            "img": "thrashers",
                            "city": "Atlanta",
                            "id": "ATL",
                            "conference": "Eastern",
                            "division": "Southeast"
                        }]
                    }
                }
            });

        });

        it('Should organize the groups to read from a key inside the objects', () => {

            expect(myTypeahead.result.length).toEqual(2)

            let dropdownItems = myTypeahead.container.find('.' + myTypeahead.options.selector.dropdownItem);

            expect(dropdownItems.length).toEqual(3);
            expect(dropdownItems.eq(0).hasClass('conference-western')).toBeTruthy();
            expect(dropdownItems.eq(1).hasClass('conference-eastern')).toBeTruthy();
            expect(dropdownItems.eq(2).hasClass('conference-all')).toBeTruthy();

            dropdownItems.eq(0).find('a').trigger('click');
            expect(myTypeahead.result.length).toEqual(1);

            dropdownItems.eq(2).find('a').trigger('click');
            expect(myTypeahead.result.length).toEqual(2);

        });

    });

    // @TODO Add test for dynamic: true
    // dropdownFilter: [{
    //     key: 'conference',
    //     value: 'Western',
    //     template: '<strong>{{conference}}</strong> Conference Teams'
    // }, {
    //     key: 'conference',
    //     value: 'Eastern',
    //     template: '<strong>{{conference}}</strong> Conference Teams',
    //     all: 'All Conferences'
    // }]

});
