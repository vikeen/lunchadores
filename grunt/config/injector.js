"use strict";

module.exports = {
    options: {},
    scripts: {
        options: {
            transform: function (filePath) {
                filePath = filePath.replace('/client/', '');
                filePath = filePath.replace('/.tmp/', '');
                return '<script src="' + filePath + '"></script>';
            },
            starttag: '<!-- injector:js -->',
            endtag: '<!-- endinjector -->'
        },
        files: {
            '<%= yeoman.client %>/index.html': [
                ['{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
                    '!{.tmp,<%= yeoman.client %>}/app/app.js',
                    '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.spec.js',
                    '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js']
            ]
        }
    },

    // Inject component styl into app.styl
    stylus: {
        options: {
            transform: function (filePath) {
                filePath = filePath.replace('/client/app/', '');
                filePath = filePath.replace('/client/components/', '');
                return '@import \'' + filePath + '\';';
            },
            starttag: '// injector',
            endtag: '// endinjector'
        },
        files: {
            '<%= yeoman.client %>/app/app.styl': [
                '<%= yeoman.client %>/{app,components}/**/*.styl',
                '!<%= yeoman.client %>/app/app.styl'
            ]
        }
    },

    // Inject component css into index.html
    css: {
        options: {
            transform: function (filePath) {
                filePath = filePath.replace('/client/', '');
                filePath = filePath.replace('/.tmp/', '');
                return '<link rel="stylesheet" href="' + filePath + '">';
            },
            starttag: '<!-- injector:css -->',
            endtag: '<!-- endinjector -->'
        },
        files: {
            '<%= yeoman.client %>/index.html': [
                '<%= yeoman.client %>/{app,components}/**/*.css'
            ]
        }
    }
};
