const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");

describe("Typeahead request Tests", () => {
  "use strict";

  let myTypeahead,
    hasBeforeSend = false,
    hasComplete = false,
    hasDone = false,
    hasFail = false,
    hasThen = false,
    hasAlways = false;

  describe("$ajax.request as an Object", () => {
    beforeAll(function() {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        dynamic: true,
        source: {
          ajax: {
            url: "http://test.com/category.json",
            path: "data",
            beforeSend: function(jqXHR, options) {
              hasBeforeSend = true;
            },
            complete: () => {
              hasComplete = true;
            },
            callback: {
              done: function(data) {
                hasDone = true;
                if (this.query == "sp") {
                  data.data[0].newKey = "newKey";
                }
                return data;
              },
              fail: () => {
                hasFail = true;
              },
              then: () => {
                hasThen = true;
              },
              always: () => {
                hasAlways = true;
              }
            }
          }
        }
      });
    });

    it("should merge Typeahead $.ajax object", done => {
      myTypeahead.node.triggerHandler("input").done(function() {
        // Always is called first, let some time for the other
        // callbacks to complete and assign their variables
        setTimeout(() => {
          expect(myTypeahead.source.group.length).toBeGreaterThan(10);
          expect(hasBeforeSend).toBeTruthy();
          expect(hasComplete).toBeTruthy();
          expect(hasDone).toBeTruthy();
          expect(hasFail).toBeFalsy();
          expect(hasThen).toBeTruthy();
          expect(hasAlways).toBeTruthy();
          expect(
            !!~myTypeahead.requests.group.request.beforeSend
              .toString()
              .indexOf("scope.xhr[group]")
          ).toBeTruthy();

          done();
        }, 10);
      });
    });

    it("should have modified the data object `from callback.done` if query == sp", done => {
      myTypeahead.node.triggerHandler("input").done(function() {
        expect(myTypeahead.result[0].newKey).toBeUndefined();

        myTypeahead.node.val("sp");
        myTypeahead.node.triggerHandler("input").done(function() {
          expect(myTypeahead.result[0].newKey).toBeDefined();
          expect(myTypeahead.result[0].invalidKey).toBeUndefined();

          done();
        });
      });
    });
  });

  describe("$ajax.request as an Array", () => {
    beforeAll(function() {
      hasBeforeSend = false;
      hasComplete = false;
      hasDone = false;
      hasFail = false;
      hasThen = false;
      hasAlways = false;

      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        source: {
          ajax: function(query) {
            return {
              url: `http://test.com/tag.json?q=${query}`,
              path: "data",
              beforeSend: function(jqXHR, options) {
                hasBeforeSend = true;
              },
              complete: () => {
                hasComplete = true;
              },
              callback: {
                done: function(data) {
                  hasDone = true;
                  return data;
                },
                fail: () => {
                  hasFail = true;
                },
                then: () => {
                  hasThen = true;
                },
                always: () => {
                  hasAlways = true;
                }
              }
            };
          }
        }
      });
    });

    it("should merge Typeahead Array into $.ajax object", done => {
      myTypeahead.node.val("test");
      myTypeahead.node.triggerHandler("input").done(function() {
        // Always is called first, let some time for the other
        // callbacks to complete and assign their variables
        setTimeout(() => {
          expect(
            !!~myTypeahead.requests.group.request.url.indexOf("?q=test")
          ).toBeTruthy();
          expect(myTypeahead.source.group.length).toBeGreaterThan(10);
          expect(
            hasBeforeSend && hasComplete && hasDone && hasThen && hasAlways
          ).toBeTruthy();
          expect(hasComplete).toBeTruthy();
          expect(hasDone).toBeTruthy();
          expect(hasFail).toBeFalsy();
          expect(hasThen).toBeTruthy();
          expect(hasAlways).toBeTruthy();
          expect(
            !!~myTypeahead.requests.group.request.beforeSend
              .toString()
              .indexOf("scope.xhr[group]")
          ).toBeTruthy();

          done();
        }, 10);
      });
    });
  });

  // #271 Data is cached inside the xhrObject
  describe("$ajax.request should have variable GET data", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        dynamic: true,
        source: {
          ajax: function(query) {
            var data = {
              hi: 1,
              hello: 2
            };

            if (query == "q") {
              data.hey = 3;
            }

            return {
              url: `http://test.com/tag.json?q=${query}`,
              data: data,
              path: "data"
            };
          }
        }
      });
    });

    it("should merge Typeahead $.ajax.data dynamically when ajax is a function", done => {
      myTypeahead.node.val("test");
      myTypeahead.node.triggerHandler("input").done(function() {
        expect(
          Object.keys(myTypeahead.requests.group.request.data).length
        ).toEqual(2);

        myTypeahead.node.val("q");
        myTypeahead.node.triggerHandler("input").done(function() {
          expect(
            Object.keys(myTypeahead.requests.group.request.data).length
          ).toEqual(3);

          myTypeahead.node.val("test");
          myTypeahead.node.triggerHandler("input").done(function() {
            expect(
              Object.keys(myTypeahead.requests.group.request.data).length
            ).toEqual(2);

            done();
          });
        });
      });
    });
  });
});
