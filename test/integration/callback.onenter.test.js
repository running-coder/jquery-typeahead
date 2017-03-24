const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead onEnter and onLeave Callback Tests', () => {
    'use strict';

    let myTypeahead,
        onEnterItem = null,
        onEnterCount = 0,
        onLeaveItem = null,
        onLeaveCount = 0;

    beforeAll(() => {

        document.body.innerHTML = '<input class="js-typeahead">';

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            minLength: 0,
            generateOnLoad: true,
            source: ["data1", "data2"],
            callback: {
                onEnter: function (node, li, item, e) {
                    onEnterItem = item;
                    onEnterCount++;
                },
                onLeave: function (node, li, item, e) {
                    onLeaveItem = item;
                    onLeaveCount++;
                }
            }
        });
    });

    it('Should call onEnter callback first item is browser with arrow down', () => {
        myTypeahead.navigate($.Event("keydown", {keyCode: 40}));
        expect(myTypeahead.resultContainer.find('li:eq(0)').hasClass('active')).toBeTruthy();
        expect(onEnterCount).toEqual(1);
        expect(onLeaveCount).toEqual(1);
        expect(onLeaveItem).toBeUndefined();
        expect(onEnterItem).toEqual({matchedKey: 'display', display: 'data1', group: 'group'});

        myTypeahead.navigate($.Event("keydown", {keyCode: 40}));
        expect(myTypeahead.resultContainer.find('li:eq(1)').hasClass('active')).toBeTruthy();
        expect(onLeaveItem).toEqual({matchedKey: 'display', display: 'data1', group: 'group'});
        expect(onEnterItem).toEqual({matchedKey: 'display', display: 'data2', group: 'group'});

        myTypeahead.navigate($.Event("keydown", {keyCode: 40}));
        expect(myTypeahead.resultContainer.find('.active')[0]).toBeUndefined();
        expect(onLeaveItem).toEqual({matchedKey: 'display', display: 'data2', group: 'group'});
        expect(onEnterItem).toBeUndefined();

        myTypeahead.navigate($.Event("keydown", {keyCode: 38}));
        expect(myTypeahead.resultContainer.find('li:eq(1)').hasClass('active')).toBeTruthy();
        expect(onEnterCount).toEqual(4);
        expect(onLeaveCount).toEqual(4);
        expect(onLeaveItem).toBeUndefined();
        expect(onEnterItem).toEqual({matchedKey: 'display', display: 'data2', group: 'group'});
    });

});
