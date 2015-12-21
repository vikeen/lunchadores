"use strict";

module.exports = function (grunt) {
    grunt.registerTask('build', [
        'clean:dist',
        'injector:stylus',
        'concurrent:dist',
        'injector',
        'useminPrepare',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);
};

