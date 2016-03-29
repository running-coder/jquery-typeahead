var glob = require('glob');
var path = require('path');
var jsdom = require('jsdom');
var doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
var win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach(function (key) {
    if (!(key in global)) {
        global[key] = window[key];
    }
});

// @TODO: Perhaps use Karma when this gets too messy?
require('./unit/config-test.js');
require('./unit/helper-test.js');
require('./integration/sanitize-test.js');
