const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");

describe("Typeahead generateOnLoad option Tests", () => {
  "use strict";

  let myTypeahead;

  describe("Typeahead generateOnLoad is not defined, the source should not be generated", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        source: {
          data: ["data1", "data2", "data3"]
        }
      });
    });

    it("Should not generate the source object", () => {
      expect(myTypeahead.source).toEqual({});
    });
  });

  describe("Typeahead generateOnLoad is defined, the source should be generated", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        generateOnLoad: true,
        source: {
          data: ["data1", "data2", "data3"]
        }
      });
    });

    it("Should generate the source object", () => {
      expect(myTypeahead.source).toEqual({
        group: [
          { display: "data1", group: "group" },
          { display: "data2", group: "group" },
          { display: "data3", group: "group" }
        ]
      });
    });
  });
});
