const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");

describe("Typeahead order option Tests", () => {
  "use strict";

  let myTypeahead;

  describe("order defined as asc", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        order: "asc",
        display: ["name", "id"],
        source: {
          myGroup: {
            data: [
              { name: "DEF", id: "1" },
              { name: "HIJ", id: "2" },
              { name: "ABC", id: "3" },
              { name: null, id: "4" },
              { name: false, id: "5" },
              { name: 0, id: "6" }
            ]
          }
        }
      });
    });

    it("Should order the items ASC", () => {
      myTypeahead.node.val("").trigger("input");

      expect(myTypeahead.result).toEqual([
        { group: "myGroup", id: "4", matchedKey: "id", name: null },
        { group: "myGroup", id: "5", matchedKey: "name", name: false },
        { group: "myGroup", id: "6", matchedKey: "name", name: 0 },
        { group: "myGroup", id: "3", matchedKey: "name", name: "ABC" },
        { group: "myGroup", id: "1", matchedKey: "name", name: "DEF" },
        { group: "myGroup", id: "2", matchedKey: "name", name: "HIJ" }
      ]);
    });
  });

  describe("order defined as desc", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        order: "desc",
        display: ["name", "id"],
        source: {
          myGroup: {
            data: [
              { name: "DEF", id: "1" },
              { name: "HIJ", id: "2" },
              { name: "ABC", id: "3" },
              { name: null, id: "4" },
              { name: false, id: "5" },
              { name: 0, id: "6" }
            ]
          }
        }
      });
    });

    it("Should order the items DESC", () => {
      myTypeahead.node.val("").trigger("input");

      expect(myTypeahead.result).toEqual([
        { group: "myGroup", id: "2", matchedKey: "name", name: "HIJ" },
        { group: "myGroup", id: "1", matchedKey: "name", name: "DEF" },
        { group: "myGroup", id: "3", matchedKey: "name", name: "ABC" },
        { group: "myGroup", id: "4", matchedKey: "id", name: null },
        { group: "myGroup", id: "5", matchedKey: "name", name: false },
        { group: "myGroup", id: "6", matchedKey: "name", name: 0 }
      ]);
    });
  });

  describe("order defined as asc while filtering out the empty values", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        order: "asc",
        display: ["name", "id"],
        filter: function(item, displayKey) {
          if (displayKey) {
            return true;
          }
        },
        source: {
          myGroup: {
            data: [
              { name: "DEF", id: "1" },
              { name: "HIJ", id: "2" },
              { name: "ABC", id: "3" },
              { name: null, id: "4" },
              { name: false, id: "5" },
              { name: 0, id: "6" }
            ]
          }
        }
      });
    });

    it("Should order the items ASC", () => {
      myTypeahead.node.val("").trigger("input");

      expect(myTypeahead.result).toEqual([
        { group: "myGroup", id: "3", matchedKey: "name", name: "ABC" },
        { group: "myGroup", id: "1", matchedKey: "name", name: "DEF" },
        { group: "myGroup", id: "2", matchedKey: "name", name: "HIJ" }
      ]);
    });
  });
});
