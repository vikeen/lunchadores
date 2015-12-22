'use strict';

var express = require("express"),
    apiRouter = express.Router();

apiRouter.use('/users', require('./Users'));
apiRouter.use('/restaurants', require('./Restaurants'));
apiRouter.use('/password-resets', require('./PasswordResets'));

module.exports = apiRouter;
