"use strict";

module.exports = {
    server: [
        'stylus'
    ],
    test: [
        'stylus'
    ],
    debug: {
        tasks: [
            'nodemon',
            'node-inspector'
        ],
        options: {
            logConcurrentOutput: true
        }
    },
    dist: [
        'stylus',
        'imagemin',
        'svgmin'
    ]
};
