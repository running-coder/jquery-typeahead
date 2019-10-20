const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");

let source = {
  country: {
    data: [
      {
        name: "Canada",
        population: 36600000
      },
      {
        name: "United-States",
        population: 301300000
      },
      {
        name: "India",
        population: 1200000000
      }
    ]
  }
};

let arrowDownEvent = $.Event("keydown");
arrowDownEvent.keyCode = 40;
let arrowRightEvent = $.Event("keydown");
arrowRightEvent.keyCode = 39;
let tabEvent = $.Event("keydown");
tabEvent.keyCode = 9;

describe("Typeahead disabled option Tests - single disabled item in the data", () => {
  let myTypeahead;
  let onLeaveItem;
  let onEnterItem;

  beforeAll(() => {
    document.body.innerHTML = '<input class="js-typeahead">';

    source.country.data[0].disabled = true;

    myTypeahead = $.typeahead({
      input: ".js-typeahead",
      minLength: 0,
      hint: true,
      blurOnTab: false,
      display: ["name"],
      source,
      callback: {
        onLeave: function(node, li, item, e) {
          onLeaveItem = item;
        },
        onEnter: function(node, li, item, e) {
          onEnterItem = item;
        }
      }
    });
  });

  it("Should not be able to select a disabled item", () => {
    myTypeahead.node.val("Ca").trigger("input");
    expect(myTypeahead.hintIndex).toEqual(null);

    myTypeahead.node.focus();
    $(".js-typeahead").trigger(arrowDownEvent);
    expect(myTypeahead.node.val()).toEqual("Ca");

    $(".js-typeahead").trigger(tabEvent);
    expect(myTypeahead.node.val()).toEqual("Ca");

    $(".js-typeahead").trigger(arrowRightEvent);
    expect(myTypeahead.node.val()).toEqual("Ca");
  });

  it("Should trigger the onLeave / onEnter with the right item", () => {
    myTypeahead.node.val("").trigger("input");

    myTypeahead.node.focus();
    $(".js-typeahead").trigger(arrowDownEvent);
    expect(onLeaveItem).toEqual(undefined);
    expect(onEnterItem.name).toEqual("United-States");

    $(".js-typeahead").trigger(tabEvent);
    expect(onLeaveItem.name).toEqual("United-States");
    expect(onEnterItem.name).toEqual("India");

    $(".js-typeahead").trigger(arrowDownEvent);
    expect(onLeaveItem.name).toEqual("India");
    expect(onEnterItem).toEqual(undefined);
  });

  afterAll(() => {
    source.country.data[0].disabled = false;
  });
});

describe("Typeahead disabled option Tests - multiple disabled items in the matcher function", () => {
  let myTypeahead;
  let onLeaveItem;
  let onEnterItem;

  beforeAll(() => {
    document.body.innerHTML = '<input class="js-typeahead">';

    myTypeahead = $.typeahead({
      input: ".js-typeahead",
      minLength: 0,
      hint: true,
      blurOnTab: false,
      display: ["name"],
      matcher: function(item, displayKey) {
        // Disable Canada & United-States for xyz reason
        if (item.name.length >= 6) {
          item.disabled = true;
          return item;
        }
        return true;
      },
      source,
      callback: {
        onLeave: function(node, li, item, e) {
          onLeaveItem = item;
        },
        onEnter: function(node, li, item, e) {
          onEnterItem = item;
        }
      }
    });
  });

  it("Should not be able to select a disabled item", () => {
    myTypeahead.node.val("Ca").trigger("input");
    expect(myTypeahead.hintIndex).toEqual(null);

    myTypeahead.node.focus();
    $(".js-typeahead").trigger(arrowDownEvent);
    expect(myTypeahead.node.val()).toEqual("Ca");

    $(".js-typeahead").trigger(tabEvent);
    expect(myTypeahead.node.val()).toEqual("Ca");
  });

  it("Should trigger the onLeave / onEnter with the right item", () => {
    myTypeahead.node.val("").trigger("input");

    myTypeahead.node.focus();
    $(".js-typeahead").trigger(tabEvent);
    expect(onLeaveItem).toEqual(undefined);
    expect(onEnterItem.name).toEqual("India");

    $(".js-typeahead").trigger(arrowDownEvent);
    expect(onLeaveItem.name).toEqual("India");
    expect(onEnterItem).toEqual(undefined);

    $(".js-typeahead").trigger(arrowDownEvent);
    expect(onLeaveItem).toEqual(undefined);
    expect(onEnterItem.name).toEqual("India");

    $(".js-typeahead").trigger(arrowRightEvent);
    expect(myTypeahead.node.val()).toEqual("India");
  });
});
