'use strict';

var _ = require('lodash'),
  models = require('../../models'),
  config = require('../../config/environment'),
  jwt = require('jsonwebtoken');

module.exports = {
  authCallback: authCallback,
  changePassword: changePassword,
  createUser: createUser,
  deleteUserById: deleteUserById,
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  me: me,
  updateUser: updateUser
};

function getAllUsers() {
  return models.user.findAll().then(function (users) {
    return _.map(users, function (user) {
      return user.profile();
    });
  });
}

function createUser(payload) {
  payload = _.merge(payload, {
    provider: 'local',
    role: 'user'
  });

  return models.user.create(payload).then(function (user) {
    var token = jwt.sign({id: user.id}, config.secrets.session, {expiresInMinutes: 60 * 5});
    return {token: token};
  });
}

function updateUser(payload) {
  return models.user.findOne(payload.id).then(function (user) {
    _.merge(user, payload).save().then(function (user) {
      return user.profile(false);
    });
  });
}

function getUserById(id) {
  return models.user.findOne(id).then(function (user) {
    return user.profile(false);
  });
}

function deleteUserById(id) {
  return models.user.destroy({where: {id: id}});
}

function changePassword(payload) {
  return models.user.findOne(payload.id).then(function (user) {
    if (user.authenticate(payload.oldPassword)) {
      user.changePassword(payload.newPassword);
      return user.save();
    } else {
      throw 'User failed authentication check for password reset';
    }
  });
}

function me(id) {
  return models.user.findOne(id).then(function(user) {
    return user.profile(true);
  });
}

function authCallback(req, res, next) {
  res.redirect('/');
}

