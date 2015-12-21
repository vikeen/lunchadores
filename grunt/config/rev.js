"use strict";

module.exports = {
    dist: {
        files: {
            src: [
                '<%= yeoman.dist %>/public/{,*/}*.js',
                '<%= yeoman.dist %>/public/{,*/}*.css',
                '<%= yeoman.dist %>/public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                '<%= yeoman.dist %>/public/assets/fonts/*'
            ]
        }
    }
};
