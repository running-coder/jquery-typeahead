const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead groupTemplate option Tests', () => {
    'use strict';

    let myTypeahead;

    describe('Hardcoded template', () => {
        beforeAll(() => {

            document.body.innerHTML = '<input class="js-typeahead">';

            myTypeahead = $.typeahead({
                input: '.js-typeahead',
                minLength: 0,
                generateOnLoad: true,
                groupTemplate: (`
                <table>
                    <tr>
                        <td>{{group_one}}</td>
                        <td>{{group_two}}</td>
                        <td>{{group_three}}</td>
                    </tr>
                </table>`).replace(/\s/g, ''),
                source: {
                    group_one: {
                        data: ['group_one_data_one', 'group_one_data_two', 'group_one_data_three', 'group_one_data_four']
                    },
                    group_two: {
                        data: ['group_two_data_one', 'group_two_data_two', 'group_two_data_three', 'group_two_data_four', 'group_two_data_five']
                    },
                    group_three: {
                        data: ['group_three_data_one', 'group_three_data_two', 'group_three_data_three', 'group_three_data_four']
                    }
                }
            });
        });

        it('Should produce 3 \<td>', () => {
            myTypeahead.node.val('data_four');
            myTypeahead.node.trigger('input');

            expect(myTypeahead.result.length).toEqual(3);
            expect(myTypeahead.resultHtml.find('td').length).toEqual(3);
            expect(myTypeahead.resultHtml.find('a').length).toEqual(3);
        });

        it('Should produce 1 \<td>', () => {
            myTypeahead.node.val('data_five');
            myTypeahead.node.trigger('input');

            expect(myTypeahead.result.length).toEqual(1);
            expect(myTypeahead.resultHtml.find('td').length).toEqual(1);
            expect(myTypeahead.resultHtml.find('a').length).toEqual(1);
        });
    });

    describe('Dynamic template', () => {
        beforeAll(() => {

            myTypeahead.options.groupOrder = "desc";
            myTypeahead.options.groupTemplate = (`
            <table>
                <tr>
                    <td>{{group}}</td>
                </tr>
            </table>`).replace(/\s/g, '');

            myTypeahead.extendOptions();
        });

        it('Should generate \<td> from groups and order them "desc"', () => {
            myTypeahead.node.val('data_four');
            myTypeahead.node.trigger('input');

            expect(myTypeahead.result.length).toEqual(3);
            expect(myTypeahead.resultHtml.find('td').length).toEqual(3);
            expect(myTypeahead.resultHtml.find('a').length).toEqual(3);
            // Test groupOrder option mixed with groupTemplate
            expect(myTypeahead.resultHtml.find('td:eq(0)').attr('data-group-template')).toEqual('group_two');
            expect(myTypeahead.resultHtml.find('td:eq(1)').attr('data-group-template')).toEqual('group_three');
            expect(myTypeahead.resultHtml.find('td:eq(2)').attr('data-group-template')).toEqual('group_one');
        });
    });

});

describe('Typeahead groupTemplate configuration using groups', () => {

    let myTypeahead;

    beforeAll(() => {

        document.body.innerHTML = '<input class="js-typeahead">';

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            display: ['key'],
            filter: false,
            dynamic: true,
            highlight: false,
            group: true,
            groupOrder: ['groupname3','groupname2','groupname1'],
            groupTemplate: '<div class="row"><div class="col-xl-3 col-sm-6">{{group}}</div></div>',
            template: function () {
                return "{{id}} {{key}}"
            },
            source: {
                groupname1: {
                    data: [{
                        id: 1,
                        key: 'Test1',
                    }]
                },
                groupname2: {
                    data: [{
                        id: 1,
                        key: 'Test1',
                    }]
                },
                groupname3: {
                    data: [{
                        id: 1,
                        key: 'NO RESULTS',
                    }]
                }
            }
        });
    });

    it('Should display the right amount of results', (done) => {

        myTypeahead.node.val('bla');
        myTypeahead.node.triggerHandler('input').done(function () {
            expect(myTypeahead.result.length).toEqual(3);

            myTypeahead.node.val('blabla');
            myTypeahead.node.triggerHandler('input').done(function () {
                expect(myTypeahead.result.length).toEqual(3);

                done();
            });
        });

    });

    afterAll(() => {
        delete window.Typeahead['.js-typeahead'];
    });

});
