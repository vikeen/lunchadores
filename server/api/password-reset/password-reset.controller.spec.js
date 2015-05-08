"use strict";

var should = require('should'),
  _ = require('lodash'),
  db,
  models,
  passwordResetController;

describe('Password Reset Controller', function () {
  before(function (done) {
    require('../../database').connect(function (database) {
      db = database;
      models = require('../../models')(database);
      passwordResetController = require('./password-reset.controller');
      done();
    });
  });

  beforeEach(function (done) {
    done();
  });

  it('should serve as a dummy test', function (done) {
      done();
  });
});
