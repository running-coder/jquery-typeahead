const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead source option Tests', () => {
    'use strict';

    let myTypeahead,
        isValidSource;

    beforeAll(() => {

        document.body.innerHTML = '<input class="js-typeahead">';

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            minLength: 0,
            display: ['display'],
            source: []
        });

    });

    describe('Typeahead.options.source - Test for an Array Strings', () => {

        beforeAll(() => {
            myTypeahead.options.source = ['data1', 'data2'];
            myTypeahead.unifySourceFormat();
            myTypeahead.node.trigger('generate');
        });

        it('Should format the Typeahead source into a group.data that contains an Array of Objects', () => {

            expect(myTypeahead.options.source).toEqual({
                group: {
                    cache: false,
                    minLength: 0,
                    maxLength: Infinity,
                    dynamic: false,
                    data:['data1', 'data2']
                }
            });

            expect(myTypeahead.source).toEqual({
                group: [{
                    'display': 'data1',
                    'group': 'group'
                }, {
                    'display': 'data2',
                    'group': 'group'
                }]
            });
        });
    });

    describe('Typeahead.options.source - Test for a String (url)', () => {

        beforeAll(() => {
            myTypeahead.options.source = "data.json";
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option into an Array of Strings', () => {
            expect(isValidSource).toBeTruthy();
            expect(myTypeahead.options.source).toEqual({
                group: {
                    cache: false,
                    minLength: 0,
                    maxLength: Infinity,
                    dynamic: false,
                    ajax: {
                        url: 'data.json'
                    }
                }
            });
        });
    });

    describe('Typeahead.options.source - Test for data Array + url String', () => {

        beforeAll(() => {
            myTypeahead.options.source = {data: ['item1', 'item2'], url: "data.json", display: 'display'};
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option into a group with data and ajax keys', () => {
            expect(isValidSource).toBeTruthy();
            expect(myTypeahead.options.source).toEqual({
                group: {
                    cache: false,
                    minLength: 0,
                    maxLength: Infinity,
                    dynamic: false,
                    data: ['item1', 'item2'],
                    ajax: {
                        url: 'data.json'
                    },
                    display: ['display']
                }
            });
        });
    });

    describe('Typeahead.options.source - Test for group with url String', () => {

        beforeAll(() => {
            myTypeahead.options.source = {group: "data.json"};
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option into a group with ajax key', () => {
            expect(isValidSource).toBeTruthy();
            expect(myTypeahead.options.source).toEqual({
                group: {
                    cache: false,
                    minLength: 0,
                    maxLength: Infinity,
                    dynamic: false,
                    ajax: {
                        url: 'data.json'
                    }
                }
            });
        });
    });

    describe('Typeahead.options.source - Test for group with ajax Object', () => {

        beforeAll(() => {
            myTypeahead.options.source = {ajax: {url: "data.json", dataType: "jsonp"}};
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option into a group with ajax key', () => {
            expect(isValidSource).toBeTruthy();
            expect(myTypeahead.options.source).toEqual({
                group: {
                    cache: false,
                    minLength: 0,
                    maxLength: Infinity,
                    dynamic: false,
                    ajax: {
                        url: 'data.json',
                        dataType: 'jsonp'
                    }
                }
            });
        });
    });

    describe('Typeahead.options.source - Test for group with Array, ajax as String', () => {

        beforeAll(() => {
            myTypeahead.options.source = {group: {url: ["data.json", "path"], display: 'display'}};
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option into a group with ajax.url and ajax.path keys', () => {
            expect(isValidSource).toBeTruthy();
            expect(myTypeahead.options.source).toEqual({
                group: {
                    cache: false,
                    minLength: 0,
                    maxLength: Infinity,
                    dynamic: false,
                    ajax: {
                        url: 'data.json',
                        path: 'path'
                    },
                    display: ['display']
                }
            });
        });
    });

    describe('Typeahead.options.source - Test for group with Array, ajax as Object', () => {

        beforeAll(() => {
            myTypeahead.options.source = {group: {url: [{url: 'data.json', dataType: 'jsonp', path: 'ajax.path'}, "path"], display: 'display'}};
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option into a group with ajax.url and ajax.path keys', () => {
            expect(isValidSource).toBeTruthy();
            expect(myTypeahead.options.source).toEqual({
                group: {
                    cache: false,
                    minLength: 0,
                    maxLength: Infinity,
                    dynamic: false,
                    ajax: {
                        url: 'data.json',
                        path: 'ajax.path',
                        dataType: 'jsonp'
                    },
                    display: ['display']
                }
            });
        });
    });

    describe('Typeahead.options.source - Test for group with legacy url key', () => {

        beforeAll(() => {
            myTypeahead.options.source = {group: {url: {url: "data.json", method: "GET"}, display: 'display'}};
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option replacing url key by ajax', () => {
            expect(isValidSource).toBeTruthy();
            expect(myTypeahead.options.source).toEqual({
                group: {
                    cache: false,
                    minLength: 0,
                    maxLength: Infinity,
                    dynamic: false,
                    ajax: {
                        url: 'data.json',
                        method: 'GET'
                    },
                    display: ['display']
                }
            });
        });
    });

    describe('Typeahead.options.source - Test for group with legacy url key', () => {

        beforeAll(() => {
            myTypeahead.options.source = {group: {test: "blabla"}};
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option replacing url key by ajax', () => {
            expect(isValidSource).toBeFalsy();
        });
    });
});
