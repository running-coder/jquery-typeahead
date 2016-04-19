var expect = require('chai').expect,
    jQuery = $ = require("jquery"),
    Typeahead = require('../../src/jquery.typeahead')(jQuery, window);

describe('Typeahead source option Tests', function () {
    'use strict';

    let myTypeahead,
        isValidSource;

    before(function () {

        document.write('<input class="js-typeahead-source">');

        myTypeahead = $.typeahead({
            input: '.js-typeahead-source',
            minLength: 0,
            display: ['display'],
            source: []
        });

    });

    describe('Typeahead.options.source - Test for an Array Strings', function () {

        before(function () {
            myTypeahead.options.source = ['data1', 'data2'];
            isValidSource = myTypeahead.unifySourceFormat();
            myTypeahead.node.trigger('generate.typeahead');
        });

        it('Should format the Source option into an Array of Strings', function () {
            expect(isValidSource).to.be.true;
            expect(myTypeahead.options.source).to.deep.equal({
                group: {
                    data: ['data1', 'data2']
                }
            });
        });

        it('Should format the Typeahead source into an Array of Objects', function () {
            expect(myTypeahead.source).to.deep.equal({
                group: [{
                    'display': 'data1',
                    'group': 'group',
                    'matchedKey': 'display'
                }, {
                    'display': 'data2',
                    'group': 'group',
                    'matchedKey': 'display'
                }]
            });
        });
    });

    describe('Typeahead.options.source - Test for a String (url)', function () {

        before(function () {
            myTypeahead.options.source = "data.json";
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option into an Array of Strings', function () {
            expect(isValidSource).to.be.true;
            expect(myTypeahead.options.source).to.deep.equal({
                group: {
                    ajax: {
                        url: 'data.json'
                    }
                }
            });
        });
    });

    describe('Typeahead.options.source - Test for data Array + url String', function () {

        before(function () {
            myTypeahead.options.source = {data: ['item1', 'item2'], url: "data.json", display: 'display'};
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option into a group with data and ajax keys', function () {
            expect(isValidSource).to.be.true;
            expect(myTypeahead.options.source).to.deep.equal({
                group: {
                    data: ['item1', 'item2'],
                    ajax: {
                        url: 'data.json'
                    },
                    display: ['display']
                }
            });
        });
    });

    describe('Typeahead.options.source - Test for group with url String', function () {

        before(function () {
            myTypeahead.options.source = {group: "data.json"};
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option into a group with ajax key', function () {
            expect(isValidSource).to.be.true;
            expect(myTypeahead.options.source).to.deep.equal({
                group: {
                    ajax: {
                        url: 'data.json'
                    }
                }
            });
        });
    });

    describe('Typeahead.options.source - Test for group with ajax Object', function () {

        before(function () {
            myTypeahead.options.source = {ajax: {url: "data.json", dataType: "jsonp"}};
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option into a group with ajax key', function () {
            expect(isValidSource).to.be.true;
            expect(myTypeahead.options.source).to.deep.equal({
                group: {
                    ajax: {
                        url: 'data.json',
                        dataType: 'jsonp'
                    }
                }
            });
        });
    });

    describe('Typeahead.options.source - Test for group with Array, ajax as String', function () {

        before(function () {
            myTypeahead.options.source = {group: {url: ["data.json", "path"], display: 'display'}};
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option into a group with ajax.url and ajax.path keys', function () {
            expect(isValidSource).to.be.true;
            expect(myTypeahead.options.source).to.deep.equal({
                group: {
                    ajax: {
                        url: 'data.json',
                        path: 'path'
                    },
                    display: ['display']
                }
            });
        });
    });

    describe('Typeahead.options.source - Test for group with Array, ajax as Object', function () {

        before(function () {
            myTypeahead.options.source = {group: {url: [{url: 'data.json', dataType: 'jsonp', path: 'ajax.path'}, "path"], display: 'display'}};
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option into a group with ajax.url and ajax.path keys', function () {
            expect(isValidSource).to.be.true;
            expect(myTypeahead.options.source).to.deep.equal({
                group: {
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

    describe('Typeahead.options.source - Test for group with legacy url key', function () {

        before(function () {
            myTypeahead.options.source = {group: {url: {url: "data.json", method: "GET"}, display: 'display'}};
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option replacing url key by ajax', function () {
            expect(isValidSource).to.be.true;
            expect(myTypeahead.options.source).to.deep.equal({
                group: {
                    ajax: {
                        url: 'data.json',
                        method: 'GET'
                    },
                    display: ['display']
                }
            });
        });
    });

    describe('Typeahead.options.source - Test for group with legacy url key', function () {

        before(function () {
            myTypeahead.options.source = {group: {test: "blabla"}};
            isValidSource = myTypeahead.unifySourceFormat();
        });

        it('Should format the Source option replacing url key by ajax', function () {
            expect(isValidSource).to.be.false;
        });
    });
});
