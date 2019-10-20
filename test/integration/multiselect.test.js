const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");

describe("Typeahead multiselect option Tests", () => {
  let myTypeahead;
  let backspaceEvent = $.Event("keydown");
  backspaceEvent.keyCode = 8;

  describe("Typeahead multiselect option Tests - basic setup", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        generateOnLoad: true,
        display: ["id", "key1", "key2", "key3"],
        multiselect: true,
        template: function() {
          return "{{id}} {{key1}} {{key2}} {{key3}}";
        },
        source: {
          group1: {
            templateValue: "{{key2}}",
            data: [
              {
                id: 1,
                key1: "group1-data1-key1",
                key2: "group1-data1-key2",
                key3: "group1-data1-key3"
              }
            ]
          },
          group2: {
            data: [
              {
                id: 1,
                key1: "group2-data1-key1",
                key2: "group2-data1-key2",
                key3: "group2-data1-key3"
              }
            ]
          }
        }
      });
    });

    it("Should populate Typeahead input with the templateValue when an item is clicked", () => {
      expect(myTypeahead.result.length).toEqual(2);

      myTypeahead.resultContainer.find("li:eq(0) a").trigger("click");
      expect(myTypeahead.query).toEqual("");
      expect(
        myTypeahead.label.container.find(".typeahead__label").length
      ).toEqual(1);
      expect(
        myTypeahead.label.container.find(".typeahead__label").text()
      ).toMatch("group1-data1-key2");

      myTypeahead.node.trigger("input");
      expect(myTypeahead.result.length).toEqual(1);

      myTypeahead.resultContainer.find("li:eq(0) a").trigger("click");
      expect(myTypeahead.query).toEqual("");
      expect(
        myTypeahead.label.container.find(".typeahead__label").length
      ).toEqual(2);
      expect(
        myTypeahead.label.container.find(".typeahead__label:last").text()
      ).toMatch("1");

      expect(myTypeahead.items.length).toBe(2);
      expect(myTypeahead.comparedItems).toEqual([
        '{"id":1,"key1":"group1-data1-key1","key2":"group1-data1-key2","key3":"group1-data1-key3"}',
        '{"id":1,"key1":"group2-data1-key1","key2":"group2-data1-key2","key3":"group2-data1-key3"}'
      ]);

      myTypeahead.label.container
        .find(".typeahead__label:first .typeahead__cancel-button")
        .trigger("click");
      expect(myTypeahead.items.length).toBe(1);
      expect(myTypeahead.comparedItems).toEqual([
        '{"id":1,"key1":"group2-data1-key1","key2":"group2-data1-key2","key3":"group2-data1-key3"}'
      ]);

      expect(myTypeahead.item).toBeNull();

      expect(
        myTypeahead.label.container.find(".typeahead__label:first > a")[0]
      ).toBeUndefined();
    });
  });

  describe("Typeahead multiselect option Tests - advanced setup", () => {
    let isClicked = false,
      clickedItem;

    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        generateOnLoad: true,
        display: ["id", "key1", "key2", "key3"],
        templateValue: "{{key2}}",
        multiselect: {
          limit: 2,
          matchOn: ["id", "key3"],
          limitTemplate: function() {
            return "Only 2 item is allowed.";
          },
          href: function(item) {
            return "/item/" + item.id;
          },
          cancelOnBackspace: true,
          data: [
            {
              id: 1,
              key1: "group1-data1-key1",
              key2: "group1-data1-key2",
              key3: "group1-data1-key3"
            }
          ],
          callback: {
            onClick: function(node, item, event) {
              event.preventDefault();
              isClicked = true;
              clickedItem = item;
            }
          }
        },
        template: function() {
          return "{{id}} {{key1}} {{key2}} {{key3}}";
        },
        source: {
          group1: {
            templateValue: "{{key2}}",
            data: [
              {
                id: 1,
                key1: "group1-data1-key1",
                key2: "group1-data1-key2",
                key3: "group1-data1-key3"
              }
            ]
          },
          group2: {
            data: [
              {
                id: 2,
                key1: "group2-data1-key1",
                key2: "group2-data1-key2",
                key3: "group2-data1-key3"
              }
            ]
          },
          group3: {
            data: [
              {
                id: 3,
                key1: "group3-data1-key1",
                key2: "group3-data1-key2",
                key3: "group3-data1-key3"
              }
            ]
          }
        }
      });
    });

    it("Should populate Typeahead input with the templateValue when an item is clicked", done => {
      expect(myTypeahead.result.length).toEqual(2);
      myTypeahead.resultContainer.find("li:eq(0) a").trigger("click");
      expect(myTypeahead.query).toEqual("");
      expect(
        myTypeahead.label.container.find(".typeahead__label").length
      ).toEqual(2);
      expect(
        myTypeahead.label.container
          .find(".typeahead__label:first > a")
          .attr("href")
      ).toBe("/item/1");

      myTypeahead.node.val("group").trigger("input");
      expect(myTypeahead.result).toEqual([]);
      expect(myTypeahead.resultContainer.find(".typeahead__empty").text()).toBe(
        "Only 2 item is allowed."
      );

      myTypeahead.label.container
        .find(".typeahead__label:first > a")
        .trigger("click");
      expect(isClicked).toBeTruthy();
      expect(clickedItem).toEqual({
        id: 1,
        key1: "group1-data1-key1",
        key2: "group1-data1-key2",
        key3: "group1-data1-key3"
      });
      expect(myTypeahead.comparedItems).toEqual([
        "1group1-data1-key3",
        "2group2-data1-key3"
      ]);

      myTypeahead.label.container
        .find(".typeahead__label:first .typeahead__cancel-button")
        .trigger("click");

      myTypeahead.node.val("group").trigger("input");
      expect(myTypeahead.result.length).toEqual(2);

      myTypeahead.node.val("").trigger("input");
      myTypeahead.node.on("input" + myTypeahead.namespace, () => {
        expect(myTypeahead.items.length).toEqual(0);
        expect(myTypeahead.result.length).toEqual(3);
        done();
      });

      myTypeahead.node.trigger(backspaceEvent);
    });
  });

  describe("Typeahead multiselect option Tests - advanced setup", () => {
    let isCanceled = false,
      canceledItem;

    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';

      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        generateOnLoad: true,
        display: ["id", "key1", "key2", "key3"],
        templateValue: "{{key2}}",
        cancelOnBackspace: false,
        multiselect: {
          matchOn: ["id"],
          data: function() {
            var deferred = $.Deferred();

            setTimeout(function() {
              deferred.resolve([
                {
                  id: 1,
                  key1: "group1-data1-key1",
                  key2: "group1-data1-key2",
                  key3: "group1-data1-key3"
                }
              ]);
            }, 500);

            return deferred;
          },
          callback: {
            onCancel: function(node, item, event) {
              isCanceled = true;
              canceledItem = item;
            }
          }
        },
        template: function() {
          return "{{id}} {{key1}} {{key2}} {{key3}}";
        },
        source: {
          group1: {
            templateValue: "{{key2}}",
            data: [
              {
                id: 1,
                key1: "group1-data1-key1",
                key2: "group1-data1-key2",
                key3: "group1-data1-key3"
              }
            ]
          },
          group2: {
            data: [
              {
                id: 2,
                key1: "group2-data1-key1",
                key2: "group2-data1-key2",
                key3: "group2-data1-key3"
              }
            ]
          }
        }
      });
    });

    it("Should populate Typeahead input with the async multiselect item and prevent duplicated data in the results", done => {
      expect(myTypeahead.result.length).toEqual(2);

      myTypeahead.node.on("search" + myTypeahead.namespace, (event, data) => {
        if (!data || data.origin !== "populateMultiselectData") return;

        expect(myTypeahead.result.length).toEqual(1);
        myTypeahead.node.trigger(backspaceEvent);
        expect(myTypeahead.items.length).toEqual(1);
        myTypeahead.label.container
          .find(".typeahead__label:first .typeahead__cancel-button")
          .trigger("click");
      });

      myTypeahead.node.on("input" + myTypeahead.namespace, (event, data) => {
        if (!data || data.origin !== "cancelMultiselectItem") return;

        expect(myTypeahead.items.length).toEqual(0);
        expect(isCanceled).toBeTruthy();
        expect(canceledItem).toEqual({
          id: 1,
          key1: "group1-data1-key1",
          key2: "group1-data1-key2",
          key3: "group1-data1-key3"
        });

        done();
      });
    });
  });
});
