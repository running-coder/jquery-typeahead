var expect = require('chai').expect,
    jQuery = $ = require("jquery"),
    Typeahead = require('../../src/jquery.typeahead')(jQuery, window);

describe('Typeahead dropdownFilter option Tests', function () {
    'use strict';

    let myTypeahead;

    before(function () {

        document.write('<input class="js-typeahead-dropdown-filter">');

        myTypeahead = $.typeahead({
            input: '.js-typeahead-dropdown-filter',
            minLength: 0,
            generateOnLoad: true,
            display: ['display'],
            template: '{{display}} {{details}}',
            emptyTemplate: "no result for {{query}}",
            source: []
        });

    });

    it('Typeahead.options.dropdownFilter - Test for boolean', function () {

        // dropdownFilter: true,

    });

    it('Typeahead.options.dropdownFilter - Test for string', function () {

        // dropdownFilter: 'All Teams',

    });

    it('Typeahead.options.dropdownFilter - Test for static', function () {

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

    it('Typeahead.options.dropdownFilter - Test for dynamic', function () {

        // dropdownFilter: [{
        //     key: 'conference',
        //     template: '<strong>{{conference}}</strong> Conference',
        //     all: 'All conferences'
        // }],

    });

    it('Typeahead.options.dropdownFilter - Test for static & dynamic', function () {

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
