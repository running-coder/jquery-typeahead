const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");

describe("Typeahead Init from one Typeahead selector inside configuration", () => {
  let myTypeahead;

  beforeAll(() => {
    document.body.innerHTML = '<input class="js-typeahead">';

    myTypeahead = $.typeahead({
      input: ".js-typeahead",
      minLength: 0,
      generateOnLoad: true,
      display: ["key1", "key2", "key3"],
      highlight: false,
      template: function() {
        return "{{id}} {{key1}} {{key2}} {{key3}}";
      },
      source: [
        {
          id: 1,
          key1: "Test1",
          key2: undefined,
          key3: "Test3"
        },
        {
          id: 2,
          key2: "Test2"
        }
      ]
    });
  });

  it("Should assign the proper Typeahead selector", () => {
    myTypeahead.node.val("test");
    myTypeahead.node.trigger("input");

    expect(myTypeahead.resultHtml.find("a:eq(0)").html()).toEqual(
      "1 Test1  Test3"
    );
    expect(myTypeahead.resultHtml.find("a:eq(1)").html()).toEqual("2  Test2 ");
  });

  afterAll(() => {
    delete window.Typeahead[".js-typeahead"];
  });
});
