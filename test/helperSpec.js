var expect = require('chai').expect;
var pkg = require('../package.json');
var jsdom = require('jsdom');
var doc = jsdom.jsdom('<!doctype html><html><body><input id="q"></body></html>');
var win = doc.defaultView;
var jQuery = $ = require("jquery")(win);
var Typeahead = require('../src/jquery.typeahead')(win, jQuery);

global.document = doc;
global.window = win;

describe('Typeahead Helpers Tests', function () {
    'use strict';

    let myTypeahead;

    before(function () {

        myTypeahead = $.typeahead({
            input: '#q',
            source: {
                testGroup: ['item1', 'item2', 'item3']
            }
        });

    });

    //it('works', function () {
        //console.log('~~~~~~~~~')
        //console.log(window.Typeahead)
        //console.log($.typeahead)
        //console.log(Typeahead.prototype.helper)
        //console.log('~~~~~~~~~')
    //});

    it('Typeahead.version', function () {

        expect(window.Typeahead.version).to.equal(pkg.version);

    });

    it('Typeahead.prototype.helper.isEmpty', function () {

        expect(Typeahead.prototype.helper.isEmpty).to.be.a('function');
        expect(Typeahead.prototype.helper.isEmpty({})).to.equal(true);
        expect(Typeahead.prototype.helper.isEmpty({test: 'test'})).to.equal(false);

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

        let myArray = [{display: 'aDisplay'}, {display: 'cDisplay'}, {display: 'bDisplay'}];

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
        ).to.eql([{display: 'aDisplay'}, {display: 'bDisplay'}, {display: 'cDisplay'}]);

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
        ).to.eql([{display: 'cDisplay'}, {display: 'bDisplay'}, {display: 'aDisplay'}])

    });
});
