'use strict';

import gulp from 'gulp';
import sassModule from 'gulp-sass';
import * as dartSass from 'sass';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import jshint from 'gulp-jshint';
import saveLicense from 'uglify-save-license';
import fs from 'fs';


const pkg = JSON.parse(fs.readFileSync('./package.json'));

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
    const sass = sassModule(dartSass);

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

// Export your tasks
export { scss, jshintTask as jshint, js, watch };

// Export default task
export default gulp.parallel(scss, js);
