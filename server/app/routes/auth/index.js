'use strict';

var express = require('express'),
    config = require('../../../config/environment')(),
    models = require('../../../app/models');

// Passport Configuration
require('./local/passport').setup(models.users, config);

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;
