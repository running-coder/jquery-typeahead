const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");

describe("Typeahead groupOrder option Tests", () => {
  "use strict";

  let myTypeahead;

  describe("groupOrder defined as desc", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        group: "category",
        groupOrder: "desc",
        display: "name",
        source: {
          myGroup: {
            data: [
              { category: "Arizona", id: "1", name: "Phil" },
              { category: "Indiana", id: "3", name: "George" }
            ]
          }
        }
      });
    });

    it("Should have 1 group and contain 2 items ordered DESC", () => {
      expect(myTypeahead.groupBy).toEqual("category");

      myTypeahead.node.val("").trigger("input");

      expect(myTypeahead.groups).toEqual(["Indiana", "Arizona"]);
      expect(myTypeahead.resultCountPerGroup).toEqual({
        Indiana: 1,
        Arizona: 1
      });

      expect(myTypeahead.result[0]).toEqual({
        matchedKey: "name",
        category: "Indiana",
        id: "3",
        name: "George",
        group: "myGroup"
      });
    });
  });

  describe("groupOrder defined as a boolean", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        group: "category",
        groupOrder: true,
        display: "name",
        source: {
          myGroup: {
            data: [
              { category: "Arizona", id: "1", name: "Phil" },
              { category: "Indiana", id: "3", name: "George" }
            ]
          }
        }
      });
    });

    it("Should have 1 group and contain 2 items ordered ASC", () => {
      expect(myTypeahead.groupBy).toEqual("category");

      myTypeahead.node.val("").trigger("input");

      expect(myTypeahead.groups).toEqual(["Arizona", "Indiana"]);
      expect(myTypeahead.resultCountPerGroup).toEqual({
        Arizona: 1,
        Indiana: 1
      });
      expect(myTypeahead.result[0]).toEqual({
        matchedKey: "name",
        category: "Arizona",
        id: "1",
        name: "Phil",
        group: "myGroup"
      });
    });
  });

  describe("groupOrder defined as an Array", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        group: "category",
        groupOrder: ["Indiana", "Arizona"],
        display: "name",
        source: {
          myGroup: {
            data: [
              { category: "Arizona", id: "1", name: "Phil" },
              { category: "Indiana", id: "3", name: "George" }
            ]
          }
        }
      });
    });

    it("Should have 1 group and contain 2 items", () => {
      expect(myTypeahead.groupBy).toEqual("category");

      myTypeahead.node.val("").trigger("input");

      expect(myTypeahead.groups).toEqual(["Indiana", "Arizona"]);
      expect(myTypeahead.resultCountPerGroup).toEqual({
        Indiana: 1,
        Arizona: 1
      });
      expect(myTypeahead.result[0]).toEqual({
        matchedKey: "name",
        category: "Indiana",
        id: "3",
        name: "George",
        group: "myGroup"
      });
    });
  });
});
