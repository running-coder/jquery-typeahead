//var pkg = require('./package.json');
//
//console.log(pkg.name)
//console.log(pkg)

module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/**\r\n' +
            ' * jQuery Typeahead\r\n' +
            ' * Copyright (C) 2015 RunningCoder.org\r\n' +
            ' * Licensed under the MIT license\r\n' +
            ' *\r\n' +
            ' * @author <%= pkg.author.name %>\r\n' +
            ' * @version <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\r\n' +
            ' * @link http://www.runningcoder.org/jquerytypeahead/\r\n' +
            '*/\r\n',

        clean: {
            dist: ["dist"]
        },

        copy: {
            dist: {
                files: [
                    {
                        src: ['src/jquery.typeahead.js'],
                        dest: 'dist/jquery.typeahead.js'
                    }
                ]
            }
        },

        comments: {
            dist: {
                options: {
                    singleline: true,
                    multiline: true
                },
                src: [ 'dist/*.js']
            }
        },

        replace: {
            removeDebug: {
                options: {
                    patterns: [
                        {
                            match: /\s?\{debug\}[\s\S]*?\{\/debug\}/g,
                            replacement: ''
                        }
                    ]
                },
                files: [
                    {
                        src: ['src/jquery.typeahead.js'],
                        dest: 'dist/jquery.typeahead.min.js'
                    }
                ]
            },
            removeComments: {
                options: {
                    patterns: [
                        {
                            match: /\/\*[\S\s]+?\*\//gm,
                            replacement: ''
                        }
                    ]
                },
                files: [
                    {
                        src: ['dist/jquery.typeahead.js'],
                        dest: 'dist/jquery.typeahead.js'
                    }
                ]
            }
        },

        concat: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: ['dist/jquery.typeahead.js'],
                dest: 'dist/jquery.typeahead.js'
            },
            src: {
                src: ['src/jquery.typeahead.js'],
                dest: 'src/jquery.typeahead.js'
            }
        },

        uglify: {
            options: {
                mangle: true,
                banner: '<%= banner %>'
            },
            dist: {
                files: {
                    'dist/jquery.typeahead.min.js': ['dist/jquery.typeahead.min.js']
                }
            }

        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-stripcomments');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['clean:dist', 'copy:dist', 'comments:dist', 'replace', 'concat', 'uglify:dist']);

};
