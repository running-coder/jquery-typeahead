const $ = require("jquery");
const Typeahead = require("../../src/jquery.typeahead");

describe("Typeahead $.ajax.callback.done Tests", () => {
  let myTypeahead;

  beforeAll(() => {
    document.body.innerHTML = '<input class="js-typeahead">';

    myTypeahead = $.typeahead({
      input: ".js-typeahead",
      minLength: 0,
      order: "asc",
      group: true,
      blurOnTab: false,
      maxItemPerGroup: 3,
      hint: true,
      dynamic: true,
      source: {
        group1: {
          ajax: {
            type: "GET",
            url: "http://test.com/groups.json",
            data: {
              term: "{{query}}"
            },
            callback: {
              done: function(data) {
                return data.group1;
              }
            }
          }
        },
        group2: {
          ajax: {
            type: "GET",
            url: "http://test.com/groups.json",
            data: {
              term: "{{query}}"
            },
            callback: {
              done: function(data) {
                data.group2.shift();
                return data.group2;
              }
            }
          }
        }
      }
    });
  });

  it("Should display the modified data 2 different groups", done => {
    myTypeahead.node.triggerHandler("input").done(function() {
      var hasDuplicatedData = false;
      var tmpResult = [];
      var stringifiedResult;

      for (let i = 0, ii = myTypeahead.result.length; i < ii; ++i) {
        stringifiedResult = JSON.stringify(myTypeahead.result[i]);
        if (~tmpResult.indexOf(stringifiedResult)) {
          hasDuplicatedData = true;
          break;
        }
        tmpResult.push(stringifiedResult);
      }

      expect(myTypeahead.result.length).toEqual(5);
      expect(hasDuplicatedData).toBeFalsy();

      done();
    });
  });
});
