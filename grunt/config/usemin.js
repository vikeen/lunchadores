"use strict";

// Performs rewrites based on rev and the useminPrepare configuration
module.exports = {
    html: ['<%= yeoman.dist %>/public/{,*/}*.html'],
    css: ['<%= yeoman.dist %>/public/{,*/}*.css'],
    js: ['<%= yeoman.dist %>/public/{,*/}*.js'],
    options: {
        assetsDirs: [
            '<%= yeoman.dist %>/public',
            '<%= yeoman.dist %>/public/assets/images'
        ],
        // This is so we update image references in our ng-templates
        patterns: {
            js: [
                [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
            ]
        }
    }
};
