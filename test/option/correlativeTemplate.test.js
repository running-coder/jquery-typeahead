const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");

describe("Typeahead correlativeTemplate option Tests", () => {
  "use strict";

  let myTypeahead;

  describe("Template with special characters", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        correlativeTemplate: true,
        template: "{{username}} <{{email}}>",
        source: {
          group_one: {
            data: [
              {
                username: "user1",
                email: "email1@domain.com"
              },
              {
                username: "user2",
                email: "email2@domain.com"
              }
            ]
          }
        }
      });
    });

    it("Should decode htmlEntities inside the template", () => {
      myTypeahead.node.val("user");
      myTypeahead.node.trigger("input");

      expect(myTypeahead.result.length).toEqual(2);
      myTypeahead.resultHtml.find("a:first").click();

      // Use html entities to preserve "<>"
      expect(myTypeahead.node.val()).toEqual("user1");
    });
  });

  describe("Template with encodedspecial characters", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        correlativeTemplate: true,
        template:
          '<span class="test" data-attribute="test">{{username}}</span><hr/><div style="color: blue">&#60;{{email}}&#62;</div>',
        source: {
          group_one: {
            data: [
              {
                username: "user1",
                email: "email1@domain.com"
              },
              {
                username: "user2",
                email: "email2@domain.com"
              }
            ]
          }
        }
      });
    });

    it("Should decode htmlEntities inside the template", () => {
      myTypeahead.node.val("user");
      myTypeahead.node.trigger("input");

      expect(myTypeahead.result.length).toEqual(2);
      expect(myTypeahead.result).toEqual([
        {
          matchedKey: "compiled",
          username: "user1",
          email: "email1@domain.com",
          group: "group_one",
          compiled: "user1 <email1@domain.com>"
        },
        {
          matchedKey: "compiled",
          username: "user2",
          email: "email2@domain.com",
          group: "group_one",
          compiled: "user2 <email2@domain.com>"
        }
      ]);
      myTypeahead.resultHtml.find("a:first").click();

      expect(myTypeahead.node.val()).toEqual("user1 <email1@domain.com>");
    });
  });
});
