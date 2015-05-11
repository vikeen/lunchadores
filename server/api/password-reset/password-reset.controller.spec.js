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
      require('../../models')(database, function() {
        models = db.models;
        passwordResetController = require('./password-reset.controller');
        done();
      });
    });
  });

  beforeEach(function (done) {
    done();
  });

  it('should serve as a dummy test', function (done) {
      done();
  });
});
