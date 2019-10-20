const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");

describe("Typeahead filter option Tests", () => {
  "use strict";

  let myTypeahead;

  describe("No filter", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        order: "desc",
        minLength: 1,
        mustSelectItem: true,
        display: ["nickname", "firstname"],
        template: "{{firstname}} <var>{{nickname}}</var>",
        source: {
          myGroup: {
            data: [
              {
                personid: 1,
                familyname: "De-Flores",
                firstname: "Nancy",
                nickname: null,
                birthlocation: "Somewhere Beautiful, Alabama"
              }
            ]
          }
        }
      });
    });

    it("Should use Typeahead filtering", () => {
      myTypeahead.node.val("Eric");
      myTypeahead.node.trigger("input");

      expect(myTypeahead.result.length).toEqual(0);
    });
  });

  describe("Filter true", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        order: "desc",
        minLength: 1,
        mustSelectItem: true,
        display: ["nickname", "firstname"],
        template: "{{firstname}} <var>{{nickname}}</var>",
        filter: false,
        source: {
          myGroup: {
            data: [
              {
                personid: 1,
                familyname: "De-Flores",
                firstname: "Nancy",
                nickname: null,
                birthlocation: "Somewhere Beautiful, Alabama"
              }
            ]
          }
        }
      });
    });

    it("Should bypass Typeahead filtering", () => {
      myTypeahead.node.val("Eric");
      myTypeahead.node.trigger("input");

      expect(myTypeahead.result.length).toEqual(1);
    });
  });
});
