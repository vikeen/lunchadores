'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;

    if (error) {
      console.error(error);
      return res.json(401, error);
    }

    if (!user.length > 0) {
      return res.json(404, {message: 'Something went wrong, please try again.'});
    }

    user = user[0];

    var token = auth.signToken(user.id, user.role);
    res.json({token: token});
  })(req, res, next)
});

module.exports = router;
