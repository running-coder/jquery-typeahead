const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead templateValue option Tests', () => {

    let myTypeahead;

    describe('Typeahead templateValue option Tests - One group have the configuration', () => {

        beforeAll(() => {

            document.body.innerHTML = '<input class="js-typeahead">';

            myTypeahead = $.typeahead({
                input: '.js-typeahead',
                minLength: 0,
                generateOnLoad: true,
                display: ['id', 'key1', 'key2', 'key3'],
                highlight: false,
                template: function () {
                    return '{{id}} {{key1}} {{key2}} {{key3}}'
                },
                source: {
                    group1: {
                        templateValue: '{{key2}}',
                        data: [{
                            id: 1,
                            key1: 'group1-data1-key1',
                            key2: 'group1-data1-key2',
                            key3: 'group1-data1-key3'
                        }]
                    },
                    group2: {
                        data: [{
                            id: 1,
                            key1: 'group2-data1-key1',
                            key2: 'group2-data1-key2',
                            key3: 'group2-data1-key3'
                        }]
                    }
                }
            });
        });

        it('Should populate Typeahead input with the templateValue when an item is clicked', (done) => {

            expect(myTypeahead.result.length).toEqual(2);

            myTypeahead.resultContainer.find('li:eq(0) a').trigger('click');
            expect(myTypeahead.query).toEqual('group1-data1-key2');

            myTypeahead.node.val('').triggerHandler('input').done(() => {
                myTypeahead.resultContainer.find('li:eq(1) a').trigger('click');

                expect(myTypeahead.query).toEqual('1');
                done();
            });

        });

    });

    describe('Typeahead templateValue option Tests - All groups have the configuration', () => {

        beforeAll(() => {

            document.body.innerHTML = '<input class="js-typeahead">';

            myTypeahead = $.typeahead({
                input: '.js-typeahead',
                minLength: 0,
                generateOnLoad: true,
                display: ['id', 'key1', 'key2', 'key3'],
                highlight: false,
                blurOnTab: false,
                template: function () {
                    return '{{id}} {{key1}} {{key2}} {{key3}}'
                },
                templateValue: '{{id}} {{key1}}',
                source: {
                    group1: {
                        templateValue: '{{key2}}',
                        data: [{
                            id: 1,
                            key1: 'group1-data1-key1',
                            key2: 'group1-data1-key2',
                            key3: 'group1-data1-key3'
                        }]
                    },
                    group2: {
                        data: [{
                            id: 1,
                            key1: 'group2-data1-key1',
                            key2: 'group2-data1-key2',
                            key3: 'group2-data1-key3'
                        }]
                    },
                    group3: {
                        templateValue: function () { return '{{key3}} test'; },
                        data: [{
                            id: 1,
                            key1: 'group3-data1-key1',
                            key2: 'group3-data1-key2',
                            key3: 'group3-data1-key3'
                        }]
                    },
                }
            });
        });

        it('Should populate Typeahead input with the templateValue when a navigation key is pressed', () => {

            var arrowDownEvent = $.Event("keydown");
            arrowDownEvent.keyCode = 40;
            var tabEvent = $.Event("keydown");
            tabEvent.keyCode = 9;

            myTypeahead.node.focus();
            $(".js-typeahead").trigger(arrowDownEvent);
            expect(myTypeahead.node.val()).toEqual('group1-data1-key2');
            $(".js-typeahead").trigger(arrowDownEvent);
            expect(myTypeahead.node.val()).toEqual('1 group2-data1-key1');
            $(".js-typeahead").trigger(arrowDownEvent);
            expect(myTypeahead.node.val()).toEqual('group3-data1-key3 test');
            $(".js-typeahead").trigger(arrowDownEvent);
            expect(myTypeahead.node.val()).toEqual(myTypeahead.rawQuery);
            $(".js-typeahead").trigger(tabEvent);
            expect(myTypeahead.node.val()).toEqual('group1-data1-key2');

        });

        it('Should populate Typeahead input with the templateValue when an item is clicked', (done) => {

            expect(myTypeahead.result.length).toEqual(3);

            myTypeahead.resultContainer.find('li:eq(0) a').trigger('click');
            expect(myTypeahead.query).toEqual('group1-data1-key2');

            myTypeahead.node.val('').triggerHandler('input').done(() => {
                myTypeahead.resultContainer.find('li:eq(1) a').trigger('click');
                expect(myTypeahead.query).toEqual('1 group2-data1-key1');

                myTypeahead.node.val('').triggerHandler('input').done(() => {
                    myTypeahead.resultContainer.find('li:eq(2) a').trigger('click');
                    expect(myTypeahead.query).toEqual('group3-data1-key3 test');

                    done();
                });
            });

        });

    });

});