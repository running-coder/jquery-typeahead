'use strict';

var glob = require('glob'),
    jsdom = require('jsdom'),
    doc = jsdom.jsdom('<!doctype html><html><body></body></html>'),
    win = doc.defaultView;

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
require('./integration/anyValueType-test.js');
require('./integration/request-test.js');
require('./option/source-test.js');
require('./option/dropdownFilter-test.js');
require('./option/groupTemplate-test.js');
require('./option/emptyTemplate-test.js');
require('./option/display-test.js');
