'use strict';

var express = require("express"),
    apiRouter = express.Router();

apiRouter.use('/users', require('./Users'));
apiRouter.use('/restaurants', require('./Restaurants'));
apiRouter.use('/password-resets', require('./PasswordResets'));
apiRouter.use('/geolocations', require('./Geolocations'));

module.exports = apiRouter;
