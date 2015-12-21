"use strict";

module.exports = function (grunt) {
    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run([
                'build',
                'env:all',
                'env:prod',
                'express:prod',
                'wait',
                'open',
                'express-keepalive']);
        }

        if (target === 'debug') {
            return grunt.task.run([
                'clean:server',
                'env:all',
                'injector:stylus',
                'concurrent:server',
                'injector',
                'concurrent:debug'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'env:all',
            'injector:stylus',
            'concurrent:server',
            'injector',
            'express:dev',
            'wait',
            'open',
            'watch'
        ]);
    });
};
