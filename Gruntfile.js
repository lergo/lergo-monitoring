'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);


    grunt.initConfig({
        watch: {
            develop: {
                files: ['**/*.js', '!node_modules/**/*'],
                tasks: ['jshint']
            }
        },

        jsdoc : {
            dist : {
                src: ['**/*.js', '!node_modules/**','!dashboard/**'],
                options: {
                    destination: 'doc'
                }
            }
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc'
            },
            'src': [
                '**/*.js',
                '!node_modules/**',
                '!doc/**',
                '!dashboard/**'
            ]


        }
    });



    grunt.registerTask('develop',[
        'jshint',
        'watch:develop'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'jsdoc'
    ]);
};
