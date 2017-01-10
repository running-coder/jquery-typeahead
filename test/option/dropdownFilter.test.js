const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead dropdownFilter option Tests', () => {
    'use strict';

    let myTypeahead;

    beforeAll(() => {

        document.body.innerHTML = '<input class="js-typeahead">';

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            minLength: 0,
            generateOnLoad: true,
            display: ['display'],
            template: '{{display}} {{details}}',
            emptyTemplate: "no result for {{query}}",
            source: []
        });

    });

    it('Typeahead.options.dropdownFilter - Test for boolean', () => {

        // dropdownFilter: true,

    });

    it('Typeahead.options.dropdownFilter - Test for string', () => {

        // dropdownFilter: 'All Teams',

    });

    it('Typeahead.options.dropdownFilter - Test for static', () => {

        // dropdownFilter: [{
        //     key: 'conference',
        //     value: 'Western',
        //     template: '<strong>Western</strong> Conference'
        // }, {
        //     key: 'conference',
        //     value: 'Eastern',
        //     template: '<strong>Eastern</strong> Conference',
        //     all: 'All Teams'
        // }],

    });

    it('Typeahead.options.dropdownFilter - Test for dynamic', () => {

        // dropdownFilter: [{
        //     key: 'conference',
        //     template: '<strong>{{conference}}</strong> Conference',
        //     all: 'All conferences'
        // }],

    });

    it('Typeahead.options.dropdownFilter - Test for static & dynamic', () => {

        // dropdownFilter: [{
        //     key: 'conference',
        //     template: '<strong>{{conference}}</strong> Conference',
        //     all: 'yay'
        // }, {
        //     key: 'division',
        //     value: 'Northeast',
        //     template: '<strong>{{division}}</strong> Division',
        //     all: 'All :o'
        // }],

    });

});
