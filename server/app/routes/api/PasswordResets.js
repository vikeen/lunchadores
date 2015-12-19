'use strict';

var express = require('express'),
    controller = require('./../../controllers/PasswordResets.js'),
    handlers = require('../../components/helpers').handlers;

var router = express.Router();

router.post('/', function (req, res) {
    handlers.request(controller.passwordReset(req.body.email_address), req, res);
});

router.post('/:verificationId', function (req, res) {
    handlers.request(controller.passwordResetVerification(req.params.verificationId, {
        email: req.body.email_address,
        newPassword: req.body.new_password
    }), req, res);
});

module.exports = router;
