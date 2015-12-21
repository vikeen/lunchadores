"use strict";

module.exports = function (grunt) {
    grunt.registerTask('express-keepalive', 'Keep grunt running', function () {
        this.async();
    });
};
