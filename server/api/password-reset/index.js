'use strict';

var express = require('express');
var controller = require('./password-reset.controller.js');
//var config = require('../../config/environment');
//var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', controller.passwordReset);
router.post('/:verificationId', controller.passwordResetVerification);

module.exports = router;
