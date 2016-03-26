var jsdom = require('jsdom');
var doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
var win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach(function(key) {
    if (!(key in global)) {
        global[key] = window[key];
    }
});