'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const saveLicense = require('uglify-save-license');

const pkg = require('./package.json');
const version = pkg.version;
const date = new Date();
const yyyy = date.getFullYear().toString();
const mm = (date.getMonth() + 1).toString();
const dd = date.getDate().toString();
const yyyymmdd = `${yyyy}-${mm}-${dd}`;
const banner = `/*!
 * jQuery Typeahead
 * Copyright (C) ${yyyy} RunningCoder.org
 * Licensed under the MIT license
 *
 * @author ${pkg.author.name}
 * @version ${version} (${yyyymmdd})
 * @link https://github.com/ChaerilM/jquery-typeahead
 */
`;

function scss() {
    return gulp
        .src('./src/jquery.typeahead.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(gulp.dest('./src'))
        .pipe(cleanCSS())
        .pipe(rename('jquery.typeahead.min.css'))
        .pipe(gulp.dest('./dist'));
}

function jshintTask() {
    return gulp
        .src('./src/jquery.typeahead.js')
        .pipe(
            jshint({
                esversion: 8, // Use ES8 syntax
                shadow: true,
                expr: true,
                loopfunc: true,
                "-W086": true,
                validthis: true,
                scripturl: true
            })
        )
        .pipe(jshint.reporter('default'));
}

function js() {
    return gulp
        .src('./src/jquery.typeahead.js')
        .pipe(replace(/\/\*![\S\s]+?\*\/[\r\n]*/, banner))
        .pipe(replace(/version: ["'].*?["']/, `version: '${version}'`))
        .pipe(gulp.dest('./src'))
        .pipe(rename('jquery.typeahead.min.js'))
        .pipe(replace(/\/\/\s?\{debug}[\s\S]*?\{\/debug}/g, ''))
        .pipe(
            uglify({
                mangle: true,
                output: {
                    comments: saveLicense
                }
            })
        )
        .pipe(gulp.dest('./dist'));
}

function watch() {
    gulp.watch('./src/jquery.typeahead.scss', scss).on('change', function (file) {
        console.log(file);
    });
}

exports.scss = scss;
exports.jshint = jshintTask;
exports.js = js;
exports.watch = watch;
exports.default = gulp.parallel(scss, js);
