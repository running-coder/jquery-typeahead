const $ = require("jquery");
const Typeahead = require('../../src/jquery.typeahead');

describe('Typeahead dynamic option Tests as a global option', () => {
    'use strict';

    let myTypeahead,
        group1Counter = 0,
        group2Counter = 0,
        group3Counter = 0;

    beforeAll(() => {

        document.body.innerHTML = '<input class="js-typeahead">';

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            minLength: 0,
            maxItemPerGroup: 1,
            dynamic: true,
            source: {
                group1: {
                    data: () => {
                        group1Counter++;
                        return ['item1'];
                    }
                },
                group2: {
                    data: () => {
                        var deferred = $.Deferred(),
                            data = ['item1'];

                        group2Counter++;

                        setTimeout(() => {
                            if (Array.isArray(data)) {
                                deferred.resolve(data);
                            } else {
                                deferred.reject("Invalid data.");
                            }
                        }, 10);

                        return deferred;
                    }
                },
                group3: {
                    ajax: {
                        url: `http://test.com/category.json`,
                        path: "data",
                        callback: {
                            always: () => {
                                group3Counter++;
                            }
                        }
                    }
                }
            }
        });
    });

    it('Should increment every group counter every time a request is made', (done) => {

        myTypeahead.node.triggerHandler('input').done(function () {
            expect(myTypeahead.result.length).toEqual(3);
            expect(group1Counter).toEqual(1);
            expect(group2Counter).toEqual(1);
            expect(group3Counter).toEqual(1);

            myTypeahead.node.triggerHandler('input').done(function () {
                expect(group1Counter).toEqual(2);
                expect(group2Counter).toEqual(2);
                expect(group3Counter).toEqual(2);

                done();
            });
        });

    });

});

describe('Typeahead dynamic option Tests as a group option', () => {
    'use strict';

    let myTypeahead,
        group1Counter = 0,
        group2Counter = 0,
        group3Counter = 0;

    beforeAll(() => {

        document.body.innerHTML = '<input class="js-typeahead">';

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            minLength: 0,
            maxItemPerGroup: 1,
            source: {
                group1: {
                    data: () => {
                        group1Counter++;
                        return ['item1'];
                    }
                },
                group2: {
                    dynamic: true,
                    data: () => {
                        var deferred = $.Deferred(),
                            data = ['item1'];

                        group2Counter++;

                        setTimeout(() => {
                            if (Array.isArray(data)) {
                                deferred.resolve(data);
                            } else {
                                deferred.reject("Invalid data.");
                            }
                        }, 10);

                        return deferred;
                    }
                },
                group3: {
                    ajax: {
                        url: `http://test.com/category.json`,
                        path: "data",
                        callback: {
                            always: () => {
                                group3Counter++;
                            }
                        }
                    }
                }
            }
        });
    });

    it('Should increment every group counter every time a request is made', (done) => {

        myTypeahead.node.triggerHandler('input').done(function (data) {
            expect(myTypeahead.result.length).toEqual(3);
            expect(group1Counter).toEqual(1);
            expect(group2Counter).toEqual(1);
            expect(group3Counter).toEqual(1);

            myTypeahead.node.triggerHandler('input').done(function () {
                expect(group1Counter).toEqual(1);
                expect(group2Counter).toEqual(2);
                expect(group3Counter).toEqual(1);

                done();
            });
        });

    });

});

describe('Typeahead dynamic option Tests - Abort dynamic requests', () => {
    'use strict';

    let myTypeahead;

    beforeAll(() => {

        document.body.innerHTML = '<input class="js-typeahead">';

        myTypeahead = $.typeahead({
            input: '.js-typeahead',
            minLength: 0,
            dynamic: true,
            delay: 10,
            source: {
                game: {
                    ajax: {
                        url: "http://test.com/game.json",
                        path: "data"
                    }
                },
                category: {
                    ajax: {
                        url: "http://test.com/category.json",
                        path: "data"
                    }
                },
                tag: {
                    ajax: {
                        url: "http://test.com/tag.json",
                        path: "data"
                    }
                }
            }
        });
    });

    it('Should abort previous requests and display the results for the second request', (done) => {

        myTypeahead.node.val('zom').trigger('input');

        // Simulate a request Abort
        setTimeout(() => {
            myTypeahead.node.val('zo').triggerHandler('input').done(function () {
                expect(myTypeahead.result.length).toBeGreaterThan(0);
                expect(myTypeahead.generatedGroupCount).toEqual(myTypeahead.generateGroups.length);

                done();
            });
        }, 20);

    });

});
