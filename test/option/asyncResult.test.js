const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");
const sinon = require("sinon");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Typeahead asyncResult option Tests", () => {
  "use strict";

  let myTypeahead;

  describe("when asyncResult has multiple static groups", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        group: "category",
        groupOrder: "desc",
        display: "name",
        asyncResult: true,
        source: {
          group1: {
            data: [
              { id: "1", name: "group1-item1" },
              { id: "2", name: "group1-item2" },
              { id: "3", name: "group1-item3" }
            ]
          },
          group2: {
            data: function() {
              return [
                { id: "1", name: "group2-item1" },
                { id: "2", name: "group2-item2" },
                { id: "3", name: "group2-item3" }
              ];
            }
          }
        }
      });
    });

    it("Should have 6 results", () => {
      myTypeahead.node.val("").trigger("input");

      expect(myTypeahead.result.length).toEqual(6);
    });
  });

  describe.only("when asyncResult has multiple static, dynamic and promised groups", () => {
    beforeAll(() => {
      const delayFakeServer = sinon.fakeServer.create();

      delayFakeServer.respondWith("GET", /\/group3\.json/, [
        200,
        { "Content-Type": "application/json" },
        JSON.stringify([
          { id: "1", name: "group3-item1" },
          { id: "2", name: "group3-item2" },
          { id: "3", name: "group3-item3" }
        ])
      ]);

      delayFakeServer.autoRespond = true;
      delayFakeServer.autoRespondAfter = 1000;

      // document.body.innerHTML = '<input class="js-typeahead">';
      document.body.innerHTML = `<form>
          <div class="typeahead__container">
              <div class="typeahead__field">
                  <div class="typeahead__query">
                      <input class="js-typeahead"
                              name="q"
                              autofocus
                              autocomplete="off">
                  </div>
              </div>
          </div>
      </form>`;

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        display: "name",
        asyncResult: true,
        maxItem: 9,
        emptyTemplate: "no result for {{query}}",
        source: {
          group1: {
            data: [
              { id: "1", name: "group1-item1" },
              { id: "2", name: "group1-item2" },
              { id: "3", name: "group1-item3" }
            ]
          },
          group2: {
            data: () => {
              const deferred = $.Deferred();
              const data = [
                { id: "1", name: "group2-item1" },
                { id: "2", name: "group2-item2" },
                { id: "3", name: "group2-item3" }
              ];

              setTimeout(() => {
                deferred.resolve(data);
              }, 2000);

              return deferred;
            }
          },
          group3: {
            dynamic: true,
            ajax: {
              type: "GET",
              url: "http://test.com/group3.json"
            }
          }
        }
      });
    });

    it("Should display async results", done => {
      myTypeahead.node.triggerHandler("input").done(async () => {
        await sleep(10);
        expect(myTypeahead.container.hasClass("loading")).toBe(true);
        expect(myTypeahead.result.length).toEqual(3);
        await sleep(1010);
        expect(myTypeahead.container.hasClass("loading")).toBe(true);
        expect(myTypeahead.result.length).toEqual(6);
        await sleep(2010);
        expect(myTypeahead.container.hasClass("loading")).toBe(false);
        expect(myTypeahead.result.length).toEqual(9);
        done();
      });
    });

    it("Should display async results for dynamic request", done => {
      myTypeahead.node
        .val("item")
        .triggerHandler("input")
        .done(async () => {
          await sleep(10);
          expect(myTypeahead.container.hasClass("loading")).toBe(true);
          expect(myTypeahead.result.length).toEqual(6);
          await sleep(2010);
          expect(myTypeahead.container.hasClass("loading")).toBe(false);
          expect(myTypeahead.result.length).toEqual(9);
          done();
        });
    });

    it("Should display no async results for dynamic request", done => {
      myTypeahead.node
        .val("invalid")
        .triggerHandler("input")
        .done(async () => {
          expect(myTypeahead.container.hasClass("loading")).toBe(true);
          expect(myTypeahead.result.length).toEqual(0);
          await sleep(2010);
          expect(myTypeahead.container.hasClass("loading")).toBe(false);
          expect(
            myTypeahead.container.find("." + myTypeahead.options.selector.empty)
              .length
          ).toBe(1);
          expect(myTypeahead.result.length).toEqual(0);
          expect(myTypeahead.resultHtml.text()).toEqual(
            "no result for invalid"
          );
          done();
        });
    });
  });
});
