'use strict';

var _ = require('lodash'),
  models = require('../../models')(),
  config = require('../../config/environment'),
  jwt = require('jsonwebtoken');

var validationError = function (res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
  models.user.find({}, function (err, users) {
    if (err) return res.send(500, err);
    res.json(200, _.map(users, function (user) {
      return user.profile()
    }));
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new models.user(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.active = true;
  newUser.save(function (err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({id: user.id}, config.secrets.session, {expiresInMinutes: 60 * 5});
    res.json({token: token});
  });
};

/**
 * Update a user
 */
exports.update = function (req, res, next) {
  var userId = req.params.id;

  models.user.get(userId, function (err, user) {
    if (err) return next(err);

    // TODO: find a better way to strip invalid update parameters
    var updated = _.merge(user, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email_address: req.body.email_address
    });
    updated.save(function (err) {
      if (err) {
        return next(err);
      }
      return res.json(200, user.profile(false));
    });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  models.user.get(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile(false));
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
  models.user.get(req.params.id, function (err, user) {
    if (err) return res.send(500, err);
    user.remove(function () {
      res.send(204);
    });

    res.send(500);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
  var oldPassword = String(req.body.oldPassword),
    newPassword = String(req.body.newPassword);

  models.user.get(req.user.id, function (err, user) {
    if (user.authenticate(oldPassword)) {
      user.changePassword(newPassword);

      user.save(function (err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
  models.user.get(req.user.id, function (err, user) {
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user.profile(true));
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
  res.redirect('/');
};

