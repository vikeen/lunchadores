"use strict";

module.exports = {
    dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= yeoman.client %>',
            dest: '<%= yeoman.dist %>/public',
            src: [
                '*.{ico,png,txt}',
                '.htaccess',
                'assets/images/{,*/}*.{webp}',
                'assets/fonts/**/*',
                'index.html'
            ]
        }, {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/public/assets/images',
            src: ['generated/*']
        }, {
            expand: true,
            dest: '<%= yeoman.dist %>',
            src: [
                'package.json',
                'server/**/*'
            ]
        }, {
            // Migrations
            expand: true,
            dest: '<%= yeoman.dist %>',
            src: ['migrations/*']
        }, {
            expand: true,
            dot: true,
            dest: '<%= yeoman.dist %>',
            src: '.sequelizerc'
        }]
    },
    styles: {
        expand: true,
        cwd: '<%= yeoman.client %>',
        dest: '.tmp/',
        src: ['{app,components}/**/*.css']
    },
    html: {
        expand: true,
        cwd: '<%= yeoman.client %>',
        dest: '.tmp/',
        src: ['{app,components}/**/*.html']
    }
};
