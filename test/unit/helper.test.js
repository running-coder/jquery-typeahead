let pkg = require('../../package.json');
let $ = require("jquery");
let Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead Helpers Tests', function() {
    'use strict';

    let myTypeahead;

    beforeAll(function() {

        document.body.innerHTML = '<input class="js-typeahead">';

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            source: {
                testGroup: ['item1', 'item2', 'item3']
            },
            callback: {
                onInit: function() {
                    return true;
                }
            }
        });

    });

    it('Typeahead.version', function() {

        expect(window.Typeahead.version).toEqual(pkg.version);

    });

    it('Typeahead.prototype.helper.isEmpty', function() {

        expect(Typeahead.prototype.helper.isEmpty).toBeDefined();
        expect(Typeahead.prototype.helper.isEmpty({})).toBeTruthy();
        expect(Typeahead.prototype.helper.isEmpty({test: 'test'})).toBeFalsy();

    });

    it('Typeahead.prototype.helper.removeAccent', function() {

        expect(Typeahead.prototype.helper.removeAccent).toBeDefined();
        expect(myTypeahead.helper.removeAccent.call(myTypeahead, 'ãàáäâẽèéëêìíïîõòóöôùúüûñç')).toEqual('aaaaaeeeeeiiiiooooouuuunc');

    });

    it('Typeahead.prototype.helper.slugify', function() {

        expect(Typeahead.prototype.helper.slugify).toBeDefined();
        expect(myTypeahead.helper.slugify.call(myTypeahead, 'url with àccénts')).toEqual('url-with-accents');
        expect(myTypeahead.helper.slugify.call(myTypeahead, 'url  with   spaces')).toEqual('url-with-spaces');
        expect(myTypeahead.helper.slugify.call(myTypeahead, 'url with !@#$%?&?&*() special chars')).toEqual('url-with-special-chars');
        expect(myTypeahead.helper.slugify.call(myTypeahead, '-url not start+=-end with-')).toEqual('url-not-start-end-with');

    });

    it('Typeahead.prototype.helper.sort', function() {

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
        ).toEqual([
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
        ).toEqual([
            {display: 'cDisplay'},
            {display: 'bDisplay'},
            {display: 'aDisplay'}
        ])

    });

    it('Typeahead.prototype.helper.replaceAt', function() {

        expect(Typeahead.prototype.helper.replaceAt).toBeDefined();
        expect(Typeahead.prototype.helper.replaceAt('thisisatest', 4, 2, 'was')).toEqual('thiswasatest');

    });

    it('Typeahead.prototype.helper.highlight', function() {

        expect(Typeahead.prototype.helper.highlight).toBeDefined();
        expect(myTypeahead.helper.highlight.apply(myTypeahead, ['highlight test', ['test'], false])).toEqual('highlight <strong>test</strong>');
        expect(myTypeahead.helper.highlight.apply(myTypeahead, ['highlight àççént test', ['accent'], false])).toEqual('highlight àççént test');
        expect(myTypeahead.helper.highlight.apply(myTypeahead, ['highlight àççént test', ['accent'], true])).toEqual('highlight <strong>àççént</strong> test');
        expect(myTypeahead.helper.highlight.apply(myTypeahead, ['test keys highlight multiple test key', ['test', 'key'], false])).toEqual('<strong>test</strong> <strong>key</strong>s highlight multiple <strong>test</strong> <strong>key</strong>');
        expect(myTypeahead.helper.highlight.apply(myTypeahead, ['highlight number 42 test', ['number 42'], false])).toEqual('highlight <strong>number 42</strong> test');

    });

    it('Typeahead.prototype.helper.getCaret', function() {

        expect(Typeahead.prototype.helper.getCaret).toBeDefined();

        myTypeahead.node.val('test');
        myTypeahead.node[0].selectionStart = myTypeahead.node.val().length;

        expect(myTypeahead.helper.getCaret(myTypeahead.node[0])).toEqual(4)

    });

    it('Typeahead.prototype.helper.cleanStringFromScript', function() {

        expect(Typeahead.prototype.helper.cleanStringFromScript).toBeDefined();

        expect(myTypeahead.helper.cleanStringFromScript(1)).toEqual(1);
        expect(myTypeahead.helper.cleanStringFromScript(undefined)).toEqual(undefined);
        expect(myTypeahead.helper.cleanStringFromScript(true)).toEqual(true);
        expect(myTypeahead.helper.cleanStringFromScript("test")).toEqual("test");
        expect(myTypeahead.helper.cleanStringFromScript("<script>alert('test');</script>")).toEqual("alert('test');");
        expect(myTypeahead.helper.cleanStringFromScript("\u003cscript\u003ealert('<iframe src='www.test.com'>test</iframe>');\u003c/script\u003e")).toEqual("alert('test');");

    });

    it('Typeahead.prototype.helper.executeCallback', function() {

        window.definedTestFunction = function() {
            return true;
        };

        window.testFunctions = {};
        window.testFunctions.oneTest = {};
        window.testFunctions.oneTest.deepTest = function (param1, param2, param3) {
            return $.map(arguments, function (v, i) {
                return v;
            });
        };

        expect(Typeahead.prototype.helper.executeCallback).toBeDefined();
        expect(myTypeahead.helper.executeCallback.apply(myTypeahead)).toBeUndefined();
        expect(myTypeahead.helper.executeCallback.apply(myTypeahead, ['undefinedTestFunction'])).toBeUndefined();
        expect(myTypeahead.helper.executeCallback.apply(myTypeahead, ['definedTestFunction'])).toBeTruthy();
        expect(myTypeahead.helper.executeCallback.apply(myTypeahead, ['window.testFunctions.oneTest.deepTest', [1, 2, 'test']])).toEqual([1, 2, 'test']);
        expect(myTypeahead.helper.executeCallback.apply(myTypeahead, [myTypeahead.options.callback.onInit])).toBeTruthy();

    });

    it('Typeahead.prototype.helper.namespace', function() {

        let myObject = {
            property: true,
            test: 'test',
            with: {
                deep: {
                    property: true
                }
            }
        };

        // get, set, create, delete
        expect(Typeahead.prototype.helper.namespace).toBeDefined();
        expect(Typeahead.prototype.helper.namespace('property', myObject)).toBeTruthy();
        expect(Typeahead.prototype.helper.namespace('with.deep.property', myObject)).toBeTruthy();
        expect(Typeahead.prototype.helper.namespace('new.property', myObject, 'create', 'newProperty')).toEqual('newProperty');
        expect(Typeahead.prototype.helper.namespace('new.property', myObject)).toEqual('newProperty');
        expect(Typeahead.prototype.helper.namespace('new.property', myObject, 'set', 'updatedProperty')).toEqual('updatedProperty');
        expect(Typeahead.prototype.helper.namespace('new.property', myObject)).toEqual('updatedProperty');
        expect(Typeahead.prototype.helper.namespace('new.property', myObject, 'delete')).toBeTruthy();
        expect(Typeahead.prototype.helper.namespace('new.property', myObject)).toBeUndefined();

        expect(Typeahead.prototype.helper.namespace('undefined', myObject)).toBeUndefined();
        expect(Typeahead.prototype.helper.namespace('undefined.property', myObject)).toBeUndefined();
        expect(Typeahead.prototype.helper.namespace('undefined', myObject, 'get', '')).toEqual('');
        expect(Typeahead.prototype.helper.namespace('undefined.property', myObject, 'get', '')).toEqual('');
        expect(Typeahead.prototype.helper.namespace('undefined.property', myObject, 'get', 'test')).toEqual('test');

    });

    it('Typeahead.prototype.helper.typeWatch', function (done) {

        expect(Typeahead.prototype.helper.typeWatch).toBeDefined();

        Typeahead.prototype.helper.typeWatch(function() {
            done();
        }, 100);

    });

});
