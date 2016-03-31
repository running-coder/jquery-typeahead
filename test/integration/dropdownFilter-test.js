var expect = require('chai').expect;
var pkg = require('../../package.json');
var jQuery = $ = require("jquery");
var Typeahead = require('../../src/jquery.typeahead')(jQuery, window);

describe('Typeahead dropdownFilter option Tests', function () {
    'use strict';

    let myTypeahead;

    before(function () {

        document.write('<input class="js-typeahead-dropdown-filter">');

        myTypeahead = $.typeahead({
            input: '.js-typeahead-dropdown-filter',
            minLength: 0,
            generateOnLoad: true,
            highlight: true,
            display: ['display'],
            template: '{{display}} {{details}}',
            emptyTemplate: "no result for {{query}}",
            source: []
        });

    });

    it('Typeahead.options.dropdownFilter - Test for boolean', function () {

    });

    it('Typeahead.options.dropdownFilter - Test for string', function () {

    });

    it('Typeahead.options.dropdownFilter - Test for object', function () {

    });

});
