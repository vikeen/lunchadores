"use strict";

module.exports = function (grunt) {
    require("./build")(grunt);
    require("./default")(grunt);
    require("./express-keepalive")(grunt);
    require("./serve")(grunt);
    require("./test")(grunt);
    require("./wait")(grunt);
};
