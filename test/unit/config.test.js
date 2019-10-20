const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");

describe("Typeahead Config Tests", () => {
  "use strict";

  let myTypeahead;

  beforeAll(() => {
    document.body.innerHTML = '<input class="js-typeahead">';

    myTypeahead = $.typeahead({
      input: ".js-typeahead",
      minLength: 0,
      highlight: false,
      group: ["test", "{{group}} options"],
      groupOrder: "asc",
      maxItemPerGroup: 6,
      source: {
        group1: {
          data: ["item1", "item2", "item2"]
        },
        group2: {
          data: ["item1", "item2", "item2"]
        }
      },
      callback: {
        onInit: function(node) {
          return this;
        },
        onSearch: function(node, query) {
          return this;
        }
      },
      selector: {
        container: "typeahead-container-test",
        result: "typeahead-result-test",
        list: "typeahead-list-test"
      },
      debug: true
    });
  });

  it("Should create properties", () => {
    expect(myTypeahead.namespace).toEqual(".js-typeahead.typeahead");
  });

  it("Should merge options", () => {
    expect(myTypeahead.options.input).toEqual(".js-typeahead");
    expect(myTypeahead.options.minLength).toEqual(0);
    expect(myTypeahead.options.highlight).toBeFalsy();
    expect(myTypeahead.options.groupOrder).toEqual("asc");
  });

  it("Should merge callbacks", () => {
    expect(myTypeahead.options.callback.onInit).toBeDefined();
    expect(
      myTypeahead.options.callback.onInit.apply(myTypeahead).selector
    ).toEqual(".js-typeahead");
    expect(myTypeahead.options.callback.onSearch).toBeDefined();

    myTypeahead.node.val("test");
    myTypeahead.node.trigger("input");

    expect(
      myTypeahead.options.callback.onSearch.apply(myTypeahead).query
    ).toEqual("test");
  });

  it("Should merge selectors", () => {
    expect(myTypeahead.options.selector.container).toEqual(
      "typeahead-container-test"
    );
    expect(myTypeahead.options.selector.result).toEqual(
      "typeahead-result-test"
    );
    expect(myTypeahead.options.selector.list).toEqual("typeahead-list-test");
  });
});
