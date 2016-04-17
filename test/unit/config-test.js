var expect = require('chai').expect,
    jQuery = $ = require("jquery"),
    Typeahead = require('../../src/jquery.typeahead')(jQuery, window);

describe('Typeahead Config Tests', function () {
    'use strict';

    let myTypeahead;

    before(function () {

        document.write('<input class="js-typeahead-options">');

        myTypeahead = $.typeahead({
            input: '.js-typeahead-options',
            minLength: 0,
            highlight: false,
            group: ["test", "{{group}} options"],
            groupOrder: 'asc',
            maxItemPerGroup: 6,
            source: {
                group1: {
                    data: ['item1', 'item2', 'item2']
                },
                group2: {
                    data: ['item1', 'item2', 'item2']
                }
            },
            callback: {
                onInit: function (node) {
                    return this;
                },
                onSearch: function (node, query) {
                    return this;
                }
            },
            selector: {
                container: "typeahead-container-test",
                result: "typeahead-result-test",
                list: "typeahead-list-test"
            },
            debug: true
        });
    });

    it('Should merge options', function () {
        expect(myTypeahead.options.input).to.equal('.js-typeahead-options');
        expect(myTypeahead.options.minLength).to.equal(0);
        expect(myTypeahead.options.highlight).to.be.false;
        expect(myTypeahead.options.groupOrder).to.equal('asc');
    });

    it('Should merge callbacks', function () {
        expect(myTypeahead.options.callback.onInit).to.be.a('function');
        expect(myTypeahead.options.callback.onInit.apply(myTypeahead).node.selector).to.equal('.js-typeahead-options');
        expect(myTypeahead.options.callback.onSearch).to.be.a('function');

        myTypeahead.node.val('test');
        myTypeahead.node.trigger('input.typeahead');

        expect(myTypeahead.options.callback.onSearch.apply(myTypeahead).query).to.equal('test')
    });

    it('Should merge selectors', function () {
        expect(myTypeahead.options.selector.container).to.equal('typeahead-container-test');
        expect(myTypeahead.options.selector.result).to.equal('typeahead-result-test');
        expect(myTypeahead.options.selector.list).to.equal('typeahead-list-test');
    });

});
