"use strict";

module.exports = {
    dist: {
        files: [{
            expand: true,
            cwd: '<%= yeoman.client %>/assets/images',
            src: '{,*/}*.svg',
            dest: '<%= yeoman.dist %>/public/assets/images'
        }]
    }
};
