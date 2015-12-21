"use strict";

// Used for delaying livereload until after server has restarted

module.exports = function (grunt) {
    grunt.registerTask('wait', function () {
        grunt.log.ok('Waiting for server reload...');

        var done = this.async();

        setTimeout(function () {
            grunt.log.writeln('Done waiting!');
            done();
        }, 1500);
    });
};
