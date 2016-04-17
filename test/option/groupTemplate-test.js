var expect = require('chai').expect,
    jQuery = $ = require("jquery"),
    Typeahead = require('../../src/jquery.typeahead')(jQuery, window);

describe('Typeahead groupTemplate option Tests', function () {
    'use strict';

    let myTypeahead;

    describe('Hardcoded template', function () {
        before(function () {

            document.write('<input class="js-typeahead-group-template-hardcoded">');

            myTypeahead = $.typeahead({
                input: '.js-typeahead-group-template-hardcoded',
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

        it('Should produce 3 \<td>', function () {
            myTypeahead.node.val('data_four');
            myTypeahead.node.trigger('input.typeahead');

            expect(myTypeahead.result.length).to.equal(3);
            expect(myTypeahead.resultHtml.find('td').length).to.equal(3);
            expect(myTypeahead.resultHtml.find('a').length).to.equal(3);
        });

        it('Should produce 1 \<td>', function () {
            myTypeahead.node.val('data_five');
            myTypeahead.node.trigger('input.typeahead');

            expect(myTypeahead.result.length).to.equal(1);
            expect(myTypeahead.resultHtml.find('td').length).to.equal(1);
            expect(myTypeahead.resultHtml.find('a').length).to.equal(1);
        });
    });

    describe('Dynamic template', function () {
        before(function () {

            myTypeahead.options.groupOrder = "desc";
            myTypeahead.options.groupTemplate = (`
            <table>
                <tr>
                    <td>{{group}}</td>
                </tr>
            </table>`).replace(/\s/g, '');

            myTypeahead.extendOptions();
        });

        it('Should generate \<td> from groups and order them "desc"', function () {
            myTypeahead.node.val('data_four');
            myTypeahead.node.trigger('input.typeahead');

            expect(myTypeahead.result.length).to.equal(3);
            expect(myTypeahead.resultHtml.find('td').length).to.equal(3);
            expect(myTypeahead.resultHtml.find('a').length).to.equal(3);
            // Test groupOrder option mixed with groupTemplate
            expect(myTypeahead.resultHtml.find('td:eq(0)').attr('data-group-template')).to.equal('group_two');
            expect(myTypeahead.resultHtml.find('td:eq(1)').attr('data-group-template')).to.equal('group_three');
            expect(myTypeahead.resultHtml.find('td:eq(2)').attr('data-group-template')).to.equal('group_one');
        });
    });

});
