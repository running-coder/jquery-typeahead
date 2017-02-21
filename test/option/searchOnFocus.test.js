const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead searchOnFocus option Tests', () => {
    'use strict';

    let myTypeahead;

    describe('Typeahead searchOnFocus is defined, the source should be searched when focused', () => {

        beforeAll(() => {

            document.body.innerHTML = '<input class="js-typeahead">';

            myTypeahead = $.typeahead({
                input: '.js-typeahead',
                minLength: 0,
                searchOnFocus: true,
                source: {
                    data: ['data1', 'data2', 'data3']
                }
            });

        });

        it('Should display results when the Typeahead input is focused', (done) => {

            expect(myTypeahead.result).toEqual({});

            myTypeahead.node.triggerHandler('focus').done(() => {
                expect(myTypeahead.source).toEqual({
                    group: [
                        {display: 'data1', group: 'group'},
                        {display: 'data2', group: 'group'},
                        {display: 'data3', group: 'group'}
                    ]
                });

                done();
            })

        });

    });

    describe('Typeahead searchOnFocus is defined, the source should not be searched when focused because of minLength: 2', () => {

        beforeAll(() => {

            document.body.innerHTML = '<input class="js-typeahead">';

            myTypeahead = $.typeahead({
                input: '.js-typeahead',
                searchOnFocus: true,
                source: {
                    data: ['data1', 'data2', 'data3']
                }
            });

        });

        it('Should not display results when the Typeahead input is focused', (done) => {

            expect(myTypeahead.result).toEqual({});

            myTypeahead.node.triggerHandler('focus').done(() => {
                expect(myTypeahead.result).toEqual({});

                done();
            });

        });

    });

});
