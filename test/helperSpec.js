var should = require('chai').should(),
    window = require("jsdom").jsdom().defaultView,
    $ = require("jquery")(window),
    Typeahead = require('../src/jquery.typeahead')(window, $);


describe('Typeahead Helpers Tests', function () {

    it('works', function () {
        console.log('~~~~~~~~~')
        console.log(window.Typeahead)
        console.log($.typeahead)
        console.log(Typeahead.prototype.helper)
        console.log('~~~~~~~~~')
    })

});
