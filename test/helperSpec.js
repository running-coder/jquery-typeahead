var should = require('chai').should(),
    $ = require('jquery');

//var typeahead = require('../src/jquery.typeahead.js')();

describe('Array', function() {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            should.equal(-1, [1,2,3].indexOf(5));
            should.equal(-1, [1,2,3].indexOf(0));
        });
    });
});