'use strict';

var _ = require('lodash'),
    models = require('../models'),
    config = require('../../config/environment')(),
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
    return models.users.findAll().then(function (users) {
        return _.map(users, function (user) {
            return user.profile();
        });
    });
}

function createUser(payload) {
    payload = _.extend({
        provider: 'local',
        role: 'user'
    }, payload);

    return models.users.create(payload).then(function (user) {
        var fiveMinutes = 60 * 5;
        var token = jwt.sign({id: user.id}, config.secrets.session, {expiresIn: fiveMinutes});
        return {token: token};
    });
}

function updateUser(payload) {
    return models.users.findById(payload.id).then(function (user) {
        var updatedUser = _.merge(user, payload);
        return updatedUser.save().then(function (user) {
            return user.profile(false);
        });
    });
}

function getUserById(id) {
    return models.users.findById(id).then(function (user) {
        return user.profile(false);
    });
}

function deleteUserById(id) {
    return models.users.destroy({where: {id: id}});
}

function changePassword(payload) {
    return models.users.findById(payload.id).then(function (user) {
        if (user.authenticate(payload.oldPassword)) {
            user.changePassword(payload.newPassword);
            return user.save();
        } else {
            throw 'User failed authentication check for password reset';
        }
    });
}

function me(id) {
    return models.users.findById(id).then(function (user) {
        return user.profile(true);
    });
}

function authCallback(req, res, next) {
    res.redirect('/');
}

