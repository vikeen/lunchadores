"use strict";

var winston = require("winston");

module.exports = {
    request: requestHandler,
    success: successHandler,
    error: errorHandler
};

function requestHandler(promise, req, res) {
    return promise.then(function (data) {
        return successHandler(data, req, res);
    }).catch(function (e) {
        return errorHandler(e, req, res);
    });
}

function errorHandler(e, req, res) {
    winston.error(e);

    if (res) {
        return res.status(500).send();
    }
}

function successHandler(data, req, res) {
    return res.status(200).json(data);
}

