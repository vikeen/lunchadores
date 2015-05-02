'use strict';

var express = require('express'),
    config = require('../config/environment'),
    models = require('../models')();

// Passport Configuration
require('./local/passport').setup(models.user, config);

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;
