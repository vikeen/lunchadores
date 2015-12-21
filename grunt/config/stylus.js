"use strict";

module.exports = {
    server: {
        options: {
            paths: [
                '<%= yeoman.client %>/app',
                '<%= yeoman.client %>/components',
                './node_modules'
            ],
            "include css": true
        },
        files: {
            '.tmp/app/app.css': '<%= yeoman.client %>/app/app.styl'
        }
    }
};
