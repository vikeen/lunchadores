"use strict";

module.exports = {
    options: {
        jshintrc: '<%= yeoman.client %>/.jshintrc',
        reporter: require('jshint-stylish')
    },
    server: {
        options: {
            jshintrc: 'server/.jshintrc'
        },
        src: [
            'server/**/*.js',
            '!server/**/*.spec.js'
        ]
    },
    serverTest: {
        options: {
            jshintrc: 'server/.jshintrc-spec'
        },
        src: ['server/**/*.spec.js']
    },
    all: [
        '<%= yeoman.client %>/{app,components}/**/*.js',
        '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
        '!<%= yeoman.client %>/{app,components}/**/*.mock.js'
    ],
    test: {
        src: [
            '<%= yeoman.client %>/{app,components}/**/*.spec.js',
            '<%= yeoman.client %>/{app,components}/**/*.mock.js'
        ]
    }
};
