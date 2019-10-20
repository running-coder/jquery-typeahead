const $ = require("jquery");
const LZString = require("lz-string");
const Typeahead = require("../../src/jquery.typeahead");

// Put LZString in window for Typeahead
window.LZString = LZString;

describe("Typeahead cache option Tests", () => {
  "use strict";

  let myTypeahead;

  function storageMock() {
    var storage = {};

    return {
      setItem: function(key, value) {
        storage[key] = value || "";
      },
      getItem: function(key) {
        return key in storage ? storage[key] : null;
      },
      removeItem: function(key) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key: function(i) {
        var keys = Object.keys(storage);
        return keys[i] || null;
      },
      clear: function() {
        storage = {};
      }
    };
  }

  beforeAll(() => {
    window.localStorage = storageMock();
    window.sessionStorage = storageMock();
  });

  describe("Typeahead cache option Tests - Global configuration", () => {
    let group1Counter = 0,
      group2Counter = 0,
      group3Counter = 0;

    beforeAll(() => {
      window.localStorage = storageMock();
      window.sessionStorage = storageMock();

      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        generateOnLoad: true,
        cache: true,
        source: {
          group1: {
            data: function() {
              group1Counter++;
              return ["group1-item1", "group1-item2", "group1-item3"];
            }
          },
          group2: {
            dynamic: true,
            data: function() {
              group2Counter++;
              return ["group2-item1", "group2-item2", "group2-item3"];
            }
          },
          group3: {
            cache: false,
            dynamic: true,
            data: function() {
              group3Counter++;
              return ["group3-item1", "group3-item2", "group3-item3"];
            }
          }
        }
      });
    });

    it("Should store in cache the configured groups", done => {
      expect(group1Counter).toEqual(1);
      expect(group2Counter).toEqual(1);
      expect(group3Counter).toEqual(1);

      expect(
        window.localStorage.getItem(
          "TYPEAHEAD_" + myTypeahead.selector + ":group1"
        )
      ).not.toBe(null);
      expect(
        window.localStorage.getItem(
          "TYPEAHEAD_" + myTypeahead.selector + ":group2"
        )
      ).not.toBe(null);
      expect(
        window.localStorage.getItem(
          "TYPEAHEAD_" + myTypeahead.selector + ":group3"
        )
      ).toBe(null);

      myTypeahead.node
        .val("group")
        .triggerHandler("input")
        .done(function(data) {
          expect(group1Counter).toEqual(1);
          expect(group2Counter).toEqual(1);
          expect(group3Counter).toEqual(2);

          done();
        });
    });

    afterAll(() => {
      window.localStorage.clear();
    });
  });

  describe("Typeahead cache option Tests - Group configuration", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        generateOnLoad: true,
        source: {
          group1: {
            cache: true,
            compression: true,
            data: function() {
              return ["group1-item1", "group1-item2", "group1-item3"];
            }
          },
          group2: {
            cache: "sessionStorage",
            data: function() {
              return ["group2-item1", "group2-item2", "group2-item3"];
            }
          },
          group3: {
            data: function() {
              return ["group3-item1", "group3-item2", "group3-item3"];
            }
          }
        }
      });
    });

    it("Should store in cache the configured groups", () => {
      expect(
        window.localStorage.getItem(
          "TYPEAHEAD_" + myTypeahead.selector + ":group1"
        )
      ).not.toBe(null);
      expect(
        window.sessionStorage.getItem(
          "TYPEAHEAD_" + myTypeahead.selector + ":group2"
        )
      ).not.toBe(null);
      expect(
        window.sessionStorage.getItem(
          "TYPEAHEAD_" + myTypeahead.selector + ":group3"
        )
      ).toBe(null);
    });

    afterAll(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
  });
});
