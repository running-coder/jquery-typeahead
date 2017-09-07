'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import jshint from 'gulp-jshint';

let pkg = require('./package.json'),
    version = pkg.version,
    date = new Date(),
    yyyy = date.getFullYear().toString(),
    mm = (date.getMonth()+1).toString(),
    dd = date.getDate().toString(),
    yyyymmdd = `${yyyy}-${mm}-${dd}`,
    banner = `/*!
 * jQuery Typeahead
 * Copyright (C) ${yyyy} RunningCoder.org
 * Licensed under the MIT license
 *
 * @author ${pkg.author.name}
 * @version ${version} (${yyyymmdd})
 * @link http://www.runningcoder.org/jquerytypeahead/
 */
`;

gulp.task('scss', function () {
    return gulp.src('./src/jquery.typeahead.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: [
                'last 3 versions',
                'ie >= 8',
                'ios >= 7',
                'android >= 4.4',
                'bb >= 10'
            ],
            cascade: false
        }))
        .pipe(gulp.dest('./src'))
        .pipe(cssnano({keepSpecialComments: 0}))
        .pipe(rename('jquery.typeahead.min.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('jshint', function() {
    return gulp.src('./src/jquery.typeahead.js')
        .pipe(jshint({
            shadow: true,
            expr: true,
            loopfunc: true,
            // Switch statements "falls through"
            "-W086": true,
            validthis: true,
            scripturl:true
        }))
        .pipe(jshint.reporter('default'));
});

gulp.task('js', function () {
    return gulp.src('./src/jquery.typeahead.js')
        .pipe(replace(/\/\*![\S\s]+?\*\/[\r\n]*/, banner))
        .pipe(replace(/version: ["'].*?["']/, `version: '${version}'`))
        .pipe(gulp.dest('./src'))
        .pipe(rename('jquery.typeahead.min.js'))
        .pipe(replace(/\/\/\s?\{debug}[\s\S]*?\{\/debug}/g, ''))
        .pipe(uglify({
            mangle: true,
            preserveComments: 'license'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
    gulp.watch('./src/jquery.typeahead.scss', gulp.task('scss')).on('change', function (file) {
        console.log(file)
    });
});

gulp.task('default', gulp.parallel('scss', /*'jshint',*/ 'js'));

