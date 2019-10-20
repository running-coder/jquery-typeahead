const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");

describe("Typeahead onCancel Callback Tests", () => {
  "use strict";

  let myTypeahead, onCancel, myItem;

  beforeAll(() => {
    document.body.innerHTML = `<form>
        <div class="typeahead__container">
            <div class="typeahead__field">
                <div class="typeahead__query">
                    <input class="js-typeahead"
                            name="q"
                            autofocus
                            autocomplete="off">
                </div>
                <div class="typeahead__button">
                    <button type="submit">
                        <span class="typeahead__search-icon"></span>
                    </button>
                </div>
            </div>
        </div>
    </form>`;

    myTypeahead = $.typeahead({
      input: ".js-typeahead",
      minLength: 0,
      generateOnLoad: true,
      display: ["display"],
      template: "{{display}} {{details}}",
      emptyTemplate: "no result for {{query}}",
      source: [
        {
          id: "1",
          display: "Test"
        },
        {
          id: "2",
          display: "callback"
        }
      ],
      callback: {
        onCancel: function(node, item, event) {
          onCancel = true;
          myItem = item;
        }
      }
    });
  });

  beforeEach(() => {
    onCancel = false;
  });

  it("Should call onCancel callback when ESC is pressed", () => {
    myTypeahead.node.val("test");
    myTypeahead.node.trigger("input");

    myTypeahead.node.trigger($.Event("keydown", { keyCode: 27 }));
    expect(onCancel).toBeTruthy();
  });

  it("Should call onCancel callback if cancel button is clicked", () => {
    myTypeahead.node.val("test");
    myTypeahead.node.trigger("input");

    myTypeahead.node
      .parent()
      .find(".typeahead__cancel-button")
      .trigger("mousedown");
    expect(onCancel).toBeTruthy();
  });

  it("Should call onCancel callback if an item is selected and the input is cleared", () => {
    myTypeahead.node.val("test");
    myTypeahead.node.trigger("input");

    let items = myTypeahead.container.find(
      "." + myTypeahead.options.selector.item
    );
    items
      .eq(0)
      .find("a")
      .trigger("click");

    myTypeahead.node.trigger($.Event("keydown", { keyCode: 27 }));
    expect(onCancel).toBeTruthy();
    expect(myItem).toEqual({
      matchedKey: "display",
      id: "1",
      display: "Test",
      group: "group"
    });
  });
});
