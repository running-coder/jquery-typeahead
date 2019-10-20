const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");

describe("Typeahead emptyTemplate option Tests", () => {
  "use strict";

  let myTypeahead;

  describe("String", () => {
    beforeAll(() => {
      document.body.innerHTML = '<input class="js-typeahead">';
      myTypeahead = $.typeahead({
        input: ".js-typeahead",
        minLength: 0,
        generateOnLoad: true,
        emptyTemplate: "No result for {{query}}",
        source: {
          data: ["test"]
        }
      });
    });

    it("Should output a String", () => {
      myTypeahead.node.val("eMpTy");
      myTypeahead.node.trigger("input");

      expect(myTypeahead.resultHtml.find("li").length).toEqual(1);
      expect(myTypeahead.resultHtml.text()).toEqual("No result for eMpTy");
    });
  });

  describe("Function that returns a String", () => {
    beforeAll(() => {
      myTypeahead.options.emptyTemplate = function(query) {
        return 'No results for "' + query + '"';
      };
    });

    it("Should output a String from a Function", () => {
      myTypeahead.node.val("Empty");
      myTypeahead.node.trigger("input");

      expect(myTypeahead.resultHtml.find("li").length).toEqual(1);
      expect(myTypeahead.resultHtml.text()).toEqual('No results for "Empty"');
    });
  });

  describe("Function that returns a jQuery Object", () => {
    beforeAll(() => {
      myTypeahead.options.emptyTemplate = function(query) {
        return $("<li>", {
          text: 'Just use "' + query + '"',
          class: "my-custom-class"
        });
      };
    });

    it("Should output a jQuery object from a Function", () => {
      myTypeahead.node.val("Empty");
      myTypeahead.node.trigger("input");

      expect(myTypeahead.resultHtml.find("li").length).toEqual(1);
      expect(myTypeahead.resultHtml.text()).toEqual('Just use "Empty"');
    });
  });

  describe("The emptyTemplate is sanitized", () => {
    beforeAll(() => {
      myTypeahead.options.emptyTemplate = "<div>No result for {{query}}</div>";
    });

    it('Should preserve the div tag and sanitize the "query"', () => {
      myTypeahead.node.val('<img src="" onerror="alert(\'bad code\')">');
      myTypeahead.node.trigger("input");

      expect(myTypeahead.resultHtml.html()).toEqual(
        '<li class="typeahead__empty"><div>No result for &lt;img src="" onerror="alert(\'bad code\')"&gt;</div></li>'
      );
    });
  });
});

describe("Typeahead emptyTemplate option Tests when a response is null", () => {
  let myTypeahead;
  let returnedData;

  beforeAll(() => {
    document.body.innerHTML = '<input class="js-typeahead">';

    myTypeahead = $.typeahead({
      input: ".js-typeahead",
      minLength: 0,
      generateOnLoad: true,
      source: {
        ajax: {
          url: "/null.json",
          callback: {
            done: function(data, textStatus, jqXHR) {
              returnedData = data;
            }
          }
        }
      },
      emptyTemplate: "No results for {{query}}"
    });
  });

  it("Should assign the proper Typeahead selector", done => {
    myTypeahead.node.val("Empty");
    myTypeahead.node.trigger("input");

    myTypeahead.node.triggerHandler("input").done(function() {
      expect(returnedData).toEqual(null);
      expect(myTypeahead.resultHtml.find("li").length).toEqual(1);
      expect(myTypeahead.resultHtml.text()).toEqual("No results for Empty");

      done();
    });
  });

  afterAll(() => {
    delete window.Typeahead[".js-typeahead"];
  });
});

describe("Typeahead emptyTemplate option Tests when a response is empty Array", () => {
  let myTypeahead;
  let returnedData;

  beforeAll(() => {
    document.body.innerHTML = '<input class="js-typeahead">';

    myTypeahead = $.typeahead({
      input: ".js-typeahead",
      minLength: 0,
      generateOnLoad: true,
      source: {
        ajax: {
          url: "/empty.json",
          callback: {
            done: function(data, textStatus, jqXHR) {
              returnedData = data;
            }
          }
        }
      },
      emptyTemplate: "No results for {{query}}"
    });
  });

  it("Should assign the proper Typeahead selector", done => {
    myTypeahead.node.val("Empty");
    myTypeahead.node.triggerHandler("input").done(function() {
      expect(returnedData).toEqual([]);
      expect(myTypeahead.resultHtml.find("li").length).toEqual(1);
      expect(myTypeahead.resultHtml.text()).toEqual("No results for Empty");

      done();
    });
  });

  afterAll(() => {
    delete window.Typeahead[".js-typeahead"];
  });
});
