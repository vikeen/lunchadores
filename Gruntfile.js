'use strict';

module.exports = function (grunt) {
    var config = require('./server/config/environment')();

    // Load grunt tasks automatically, when needed
    require('jit-grunt')(grunt, {
        express: 'grunt-express-server',
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        protractor: 'grunt-protractor-runner',
        injector: 'grunt-asset-injector',
        buildcontrol: 'grunt-build-control'
    });

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    var gruntConfig = require("./grunt/config");
    gruntConfig.pkg = grunt.file.readJSON('package.json');
    gruntConfig.yeoman = {
        client: 'client',
        dist: 'dist'
    };

    grunt.initConfig(gruntConfig);

    // Define all tasks
    require("./grunt/tasks")(grunt);
};
