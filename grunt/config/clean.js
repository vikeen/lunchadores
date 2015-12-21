"use strict";

module.exports = {
    dist: {
        files: [{
            dot: true,
            src: [
                '.tmp',
                '<%= yeoman.dist %>/*',
                '!<%= yeoman.dist %>/.git*',
                '!<%= yeoman.dist %>/Procfile'
            ]
        }]
    },
    server: '.tmp'
};
