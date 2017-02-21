const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead onSendRequest Callback Tests', () => {
    'use strict';

    let myTypeahead;

    beforeAll(() => {

        document.body.innerHTML = '<input class="js-typeahead">';

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            minLength: 0,
            generateOnLoad: true,
            display: ['name'],
            emptyTemplate: "no result for {{query}}",
            source: {
                group1: {
                    ajax: {
                        url: ''
                    }
                },
                group2: {
                    ajax: {
                        url: ''
                    }
                }
            },
            callback: {
                onSendRequest: function (node, event) {

                    // Return false will prevent from sending Ajax request(s)
                    return !!this.query.length;
                }
            }
        });
    });

    it('Should not display any data because the requests were canceled', () => {
        // @TODO Add the test
    });

});
