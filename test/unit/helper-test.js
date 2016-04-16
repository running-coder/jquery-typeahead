var expect = require('chai').expect,
    pkg = require('../../package.json'),
    jQuery = $ = require("jquery"),
    Typeahead = require('../../src/jquery.typeahead')(jQuery, window);

describe('Typeahead Helpers Tests', function () {
    'use strict';

    let myTypeahead;

    before(function () {

        document.write('<input class="js-typeahead-helper">');

        myTypeahead = $.typeahead({
            input: '.js-typeahead-helper',
            source: {
                testGroup: ['item1', 'item2', 'item3']
            },
            callback: {
                onInit: function () {
                    return true;
                }
            }
        });

    });

    it('Typeahead.version', function () {

        expect(window.Typeahead.version).to.equal(pkg.version);

    });

    it('Typeahead.prototype.helper.isEmpty', function () {

        expect(Typeahead.prototype.helper.isEmpty).to.be.a('function');
        expect(Typeahead.prototype.helper.isEmpty({})).to.be.true;
        expect(Typeahead.prototype.helper.isEmpty({test: 'test'})).to.be.false;

    });

    it('Typeahead.prototype.helper.removeAccent', function () {

        expect(Typeahead.prototype.helper.removeAccent).to.be.a('function');
        expect(myTypeahead.helper.removeAccent.call(myTypeahead, 'ãàáäâẽèéëêìíïîõòóöôùúüûñç')).to.equal('aaaaaeeeeeiiiiooooouuuunc');

    });

    it('Typeahead.prototype.helper.slugify', function () {

        expect(Typeahead.prototype.helper.slugify).to.be.a('function');
        expect(myTypeahead.helper.slugify.call(myTypeahead, 'url with àccénts')).to.equal('url-with-accents');
        expect(myTypeahead.helper.slugify.call(myTypeahead, 'url  with   spaces')).to.equal('url-with-spaces');
        expect(myTypeahead.helper.slugify.call(myTypeahead, 'url with !@#$%?&?&*() special chars')).to.equal('url-with-special-chars');
        expect(myTypeahead.helper.slugify.call(myTypeahead, '-url not start+=-end with-')).to.equal('url-not-start-end-with');

    });

    it('Typeahead.prototype.helper.sort', function () {

        let myArray = [
            {display: 'aDisplay'},
            {display: 'cDisplay'},
            {display: 'bDisplay'}
        ];

        expect(
            myArray.sort(
                Typeahead.prototype.helper.sort(
                    ['display'],
                    true,
                    function (a) {
                        return a.toString().toUpperCase()
                    }
                )
            )
        ).to.eql([
            {display: 'aDisplay'},
            {display: 'bDisplay'},
            {display: 'cDisplay'}
        ]);

        expect(
            myArray.sort(
                Typeahead.prototype.helper.sort(
                    ['display'],
                    false,
                    function (a) {
                        return a.toString().toUpperCase()
                    }
                )
            )
        ).to.eql([
            {display: 'cDisplay'},
            {display: 'bDisplay'},
            {display: 'aDisplay'}
        ])

    });

    it('Typeahead.prototype.helper.replaceAt', function () {

        expect(Typeahead.prototype.helper.replaceAt).to.be.a('function');
        expect(Typeahead.prototype.helper.replaceAt('thisisatest', 4, 2, 'was')).to.equal('thiswasatest');

    });

    it('Typeahead.prototype.helper.highlight', function () {

        expect(Typeahead.prototype.helper.highlight).to.be.a('function');
        expect(myTypeahead.helper.highlight.apply(myTypeahead, ['highlight test', ['test'], false])).to.equal('highlight <strong>test</strong>');
        expect(myTypeahead.helper.highlight.apply(myTypeahead, ['highlight àççént test', ['accent'], false])).to.equal('highlight àççént test');
        expect(myTypeahead.helper.highlight.apply(myTypeahead, ['highlight àççént test', ['accent'], true])).to.equal('highlight <strong>àççént</strong> test');
        expect(myTypeahead.helper.highlight.apply(myTypeahead, ['test keys highlight multiple test key', ['test', 'key'], false])).to.equal('<strong>test</strong> <strong>key</strong>s highlight multiple <strong>test</strong> <strong>key</strong>');
        expect(myTypeahead.helper.highlight.apply(myTypeahead, ['highlight number 42 test', ['number 42'], false])).to.equal('highlight <strong>number 42</strong> test');

    });

    it('Typeahead.prototype.helper.getCaret', function () {

        expect(Typeahead.prototype.helper.getCaret).to.be.a('function');

        myTypeahead.node.val('test');
        myTypeahead.node[0].selectionStart = myTypeahead.node.val().length;

        expect(myTypeahead.helper.getCaret(myTypeahead.node[0])).to.equal(4)

    });

    it('Typeahead.prototype.helper.cleanStringFromScript', function () {

        expect(Typeahead.prototype.helper.cleanStringFromScript).to.be.a('function');

        expect(myTypeahead.helper.cleanStringFromScript(1)).to.equal(1);
        expect(myTypeahead.helper.cleanStringFromScript(undefined)).to.equal(undefined);
        expect(myTypeahead.helper.cleanStringFromScript(true)).to.equal(true);
        expect(myTypeahead.helper.cleanStringFromScript("test")).to.equal("test");
        expect(myTypeahead.helper.cleanStringFromScript("<script>alert('test');</script>")).to.equal("alert('test');");
        expect(myTypeahead.helper.cleanStringFromScript("\u003cscript\u003ealert('<iframe src='www.test.com'>test</iframe>');\u003c/script\u003e")).to.equal("alert('test');");

    });

    it('Typeahead.prototype.helper.executeCallback', function () {

        window.definedTestFunction = function () {
            return true;
        };

        window.testFunctions = {};
        window.testFunctions.oneTest = {};
        window.testFunctions.oneTest.deepTest = function (param1, param2, param3) {
            return $.map(arguments, function (v, i) {
                return v;
            });
        };

        expect(Typeahead.prototype.helper.executeCallback).to.be.a('function');
        expect(myTypeahead.helper.executeCallback.apply(myTypeahead)).to.be.undefined;
        expect(myTypeahead.helper.executeCallback.apply(myTypeahead, ['undefinedTestFunction'])).to.be.undefined;
        expect(myTypeahead.helper.executeCallback.apply(myTypeahead, ['definedTestFunction'])).to.be.true;
        expect(myTypeahead.helper.executeCallback.apply(myTypeahead, ['window.testFunctions.oneTest.deepTest', [1, 2, 'test']])).to.eql([1, 2, 'test']);
        expect(myTypeahead.helper.executeCallback.apply(myTypeahead, [myTypeahead.options.callback.onInit])).to.be.true;

    });

    it('Typeahead.prototype.helper.namespace', function () {

        let myObject = {
            property: true,
            test: 'test',
            with: {
                deep: {
                    property: true
                }
            }
        }

        // get, set, create, delete
        expect(Typeahead.prototype.helper.namespace).to.be.a('function');
        expect(Typeahead.prototype.helper.namespace('property', myObject)).to.be.true;
        expect(Typeahead.prototype.helper.namespace('undefined.property', myObject)).to.be.undefined;
        expect(Typeahead.prototype.helper.namespace('with.deep.property', myObject)).to.be.true;
        expect(Typeahead.prototype.helper.namespace('new.property', myObject, 'create', 'newProperty')).to.equal('newProperty');
        expect(Typeahead.prototype.helper.namespace('new.property', myObject)).to.equal('newProperty');
        expect(Typeahead.prototype.helper.namespace('new.property', myObject, 'set', 'updatedProperty')).to.equal('updatedProperty');
        expect(Typeahead.prototype.helper.namespace('new.property', myObject)).to.equal('updatedProperty');
        expect(Typeahead.prototype.helper.namespace('new.property', myObject, 'delete')).to.be.true;
        expect(Typeahead.prototype.helper.namespace('new.property', myObject)).to.be.undefined;

    });

    it('Typeahead.prototype.helper.typeWatch', function (done) {

        expect(Typeahead.prototype.helper.typeWatch).to.be.a('function');

        Typeahead.prototype.helper.typeWatch(function () {
            done();
        }, 100);

    });

});
