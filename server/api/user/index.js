'use strict';

var express = require('express'),
  controller = require('./user.controller'),
  config = require('../../config/environment')(),
  auth = require('../../auth/auth.service'),
  handlers = require('../../components/helpers').handlers;

var router = express.Router();

router.get('/', auth.hasRole('admin'), function (req, res) {
  handlers.request(controller.getAllUsers(), req, res);
});

router.delete('/:id', auth.hasRole('admin'), function (req, res) {
  handlers.request(controller.deleteUserById(req.params.id), req, res);
});

router.get('/me', auth.isAuthenticated(), function (req, res) {
  handlers.request(controller.me(req.user.id), req, res);
});

router.put('/:id/password', auth.isAuthenticated(), function (req, res) {
  handlers.request(controller.changePassword({
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
    id: req.user.id
  }), req, res);
});

router.put('/:id', auth.isAuthenticated(), function (req, res) {
  handlers.request(controller.updateUser({
    id: req.params.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email_address
  }), req, res);
});

router.get('/:id', auth.isAuthenticated(), function (req, res) {
  handlers.request(controller.getUserById(req.params.id), req, res);
});

router.post('/', function (req, res) {
  handlers.request(controller.createUser(req.body), req, res);
});

module.exports = router;
