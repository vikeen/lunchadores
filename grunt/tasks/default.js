"use strict";

module.exports = function (grunt) {
    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};