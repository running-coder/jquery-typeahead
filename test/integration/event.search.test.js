const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");

describe("Typeahead Init from one Typeahead selector inside configuration", () => {
  let myTypeahead;

  beforeAll(() => {
    document.body.innerHTML =
      '<div class="typeahead__container"><input class="js-typeahead"></div>';

    myTypeahead = $.typeahead({
      input: ".js-typeahead",
      minLength: 1,
      generateOnLoad: true,
      highlight: false,
      emptyTemplate: 'No result for "{{query}}"',
      source: ["data1", "data2", "data3"]
    });
  });

  it("Should search / build / hide properly according to configuration", () => {
    expect(myTypeahead.result).toEqual([]);

    myTypeahead.node.val("d").trigger("input");
    expect(myTypeahead.result.length).toEqual(3);
    expect(
      myTypeahead.resultContainer.find("." + myTypeahead.options.selector.item)
        .length
    ).toEqual(3);

    myTypeahead.node.val("dd").trigger("input");
    expect(myTypeahead.result.length).toEqual(0);
    expect(
      myTypeahead.resultContainer
        .find("." + myTypeahead.options.selector.list)
        .hasClass("empty")
    ).toBeTruthy();
    expect(
      myTypeahead.resultContainer
        .find("." + myTypeahead.options.selector.empty)
        .text()
    ).toEqual('No result for "dd"');

    myTypeahead.node.val("").trigger("input");
    expect(myTypeahead.result).toEqual([]);
    expect(myTypeahead.container.hasClass("result")).toBeFalsy();
  });

  afterAll(() => {
    delete window.Typeahead[".js-typeahead"];
  });
});
