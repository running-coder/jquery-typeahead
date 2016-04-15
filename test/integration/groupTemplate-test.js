var expect = require('chai').expect;
var pkg = require('../../package.json');
var jQuery = $ = require("jquery");
var Typeahead = require('../../src/jquery.typeahead')(jQuery, window);

describe('Typeahead groupTemplate option Tests', function () {
    'use strict';

    let myTypeahead;

    describe('Typeahead.option.groupTemplate - Test hardcoded template', function () {

        before(function () {

            document.write('<input class="js-typeahead-group-template-hardcoded">');

            myTypeahead = $.typeahead({
                input: '.js-typeahead-group-template-hardcoded',
                minLength: 0,
                generateOnLoad: true,
                highlight: true,
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
                        data: ['group_one_data_one','group_one_data_two','group_one_data_three','group_one_data_four']
                    },
                    group_two: {
                        data: ['group_two_data_one','group_two_data_two','group_two_data_three','group_two_data_four']
                    },
                    group_three: {
                        data: ['group_three_data_one','group_three_data_two','group_three_data_three','group_three_data_four']
                    }
                }
            });

        });

        it('Test integrity of the html', function () {

            myTypeahead.node.val('data_four');
            myTypeahead.node.trigger('input.typeahead');

            expect(myTypeahead.result.length).to.equal(3);

            //console.log('~~~~~')
            //console.log(myTypeahead.resultHtml[0].outerHTML)
            //console.log('~~~~~')

            //expect(!!~myTypeahead.requests.group.request.beforeSend.toString().indexOf('scope.xhr[group] = jqXHR;')).to.be.true;

        });

    });

});
