"use strict";

module.exports = {
    injectJS: {
        files: [
            '<%= yeoman.client %>/{app,components}/**/*.js',
            '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
            '!<%= yeoman.client %>/{app,components}/**/*.mock.js',
            '!<%= yeoman.client %>/app/app.js'],
        tasks: ['injector:scripts']
    },
    injectCss: {
        files: [
            '<%= yeoman.client %>/{app,components}/**/*.css'
        ],
        tasks: ['injector:css']
    },
    mochaTest: {
        files: ['server/test/**/*.spec.js'],
        tasks: ['env:test', 'test:server']
    },
    jsTest: {
        files: [
            '<%= yeoman.client %>/{app,components}/**/*.spec.js',
            '<%= yeoman.client %>/{app,components}/**/*.mock.js'
        ],
        tasks: ['newer:jshint:all', 'karma']
    },
    injectStylus: {
        files: [
            '<%= yeoman.client %>/{app,components}/**/*.styl'],
        tasks: ['injector:stylus']
    },
    stylus: {
        files: [
            '<%= yeoman.client %>/{app,components}/**/*.styl'],
        tasks: ['stylus']
    },
    html: {
        files: [
            '<%= yeoman.client %>/{app,components}/**/*.html'],
        tasks: ['copy:html']
    },
    gruntfile: {
        files: ['Gruntfile.js']
    },
    livereload: {
        files: [
            '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.css',
            '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.html',
            '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
            '!{.tmp,<%= yeoman.client %>}{app,components}/**/*.spec.js',
            '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js',
            '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
            livereload: true
        }
    },
    express: {
        files: [
            'server/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
            livereload: true,
            nospawn: true //Without this option specified express won't
                          // be reloaded
        }
    }
};
