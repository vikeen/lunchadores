"use strict";

module.exports = function (grunt) {
    grunt.registerTask('test', function (target) {
        return grunt.task.run([
            'env:test',
            'mochaTest'
        ]);
    });
};

