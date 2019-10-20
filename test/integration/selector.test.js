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
      source: ["Test init"]
    });
  });

  it("Should assign the proper Typeahead selector", () => {
    // Equals 2 since "version" is also in the Typeahead object
    expect(Object.keys(window.Typeahead).length).toEqual(2);

    expect(window.Typeahead[".js-typeahead"]).toBeDefined();
    expect(window.Typeahead[".js-typeahead"].selector).toEqual(".js-typeahead");
  });

  afterAll(() => {
    delete window.Typeahead[".js-typeahead"];
  });
});

describe("Typeahead Init from one Typeahead jQuery selector", () => {
  let myTypeahead;

  beforeAll(() => {
    document.body.innerHTML = '<input class="js-typeahead">';

    myTypeahead = $(".js-typeahead").typeahead({
      minLength: 0,
      generateOnLoad: true,
      source: ["Test init"]
    });
  });

  it("Should assign the proper Typeahead selector", () => {
    // Equals 2 since "version" is also in the Typeahead object
    expect(Object.keys(window.Typeahead).length).toEqual(2);

    expect(
      window.Typeahead["input"] || window.Typeahead[".js-typeahead"]
    ).toBeDefined();

    var hasProperSelector = !!(
      (window.Typeahead["input"] && window.Typeahead["input"].selector) ||
      (window.Typeahead[".js-typeahead"] &&
        window.Typeahead[".js-typeahead"].selector)
    );

    expect(hasProperSelector).toBeTruthy();
  });

  afterAll(() => {
    delete window.Typeahead["input"];
    delete window.Typeahead[".js-typeahead"];
  });
});

describe("Typeahead Init from multiple typeahead selectors", () => {
  let myTypeahead;

  beforeAll(() => {
    document.body.innerHTML =
      '<input class="js-typeahead"><input class="js-typeahead">';

    myTypeahead = $.typeahead({
      input: ".js-typeahead",
      minLength: 0,
      generateOnLoad: true,
      source: ["Test init"]
    });
  });

  it("Should assign the proper Typeahead selectors", () => {
    // Equals 3 since "version" is also in the Typeahead object
    expect(Object.keys(window.Typeahead).length).toEqual(3);
    expect(window.Typeahead["input"]).toBeDefined();
    expect(window.Typeahead["input"].selector).toEqual("input");
    expect(window.Typeahead["input1"]).toBeDefined();
    expect(window.Typeahead["input1"].selector).toEqual("input1");
  });

  afterAll(() => {
    delete window.Typeahead["input"];
    delete window.Typeahead["input1"];
  });
});

describe("Typeahead Init from multiple typeahead jQuery selectors", () => {
  let myTypeahead;

  beforeAll(() => {
    document.body.innerHTML =
      '<input class="js-typeahead"><input class="js-typeahead"><input class="js-typeahead"><input class="js-typeahead">';

    myTypeahead = $(".js-typeahead").typeahead({
      minLength: 0,
      generateOnLoad: true,
      source: ["Test init"]
    });
  });

  it("Should assign the proper Typeahead selectors", () => {
    // Equals 5 since "version" is also in the Typeahead object
    expect(Object.keys(window.Typeahead).length).toEqual(5);
    expect(window.Typeahead["input"]).toBeDefined();
    expect(window.Typeahead["input"].selector).toEqual("input");
    expect(window.Typeahead["input1"]).toBeDefined();
    expect(window.Typeahead["input1"].selector).toEqual("input1");
    expect(window.Typeahead["input2"]).toBeDefined();
    expect(window.Typeahead["input2"].selector).toEqual("input2");
    expect(window.Typeahead["input3"]).toBeDefined();
    expect(window.Typeahead["input3"].selector).toEqual("input3");
  });

  afterAll(() => {
    delete window.Typeahead["input"];
    delete window.Typeahead["input1"];
    delete window.Typeahead["input2"];
    delete window.Typeahead["input3"];
  });
});
