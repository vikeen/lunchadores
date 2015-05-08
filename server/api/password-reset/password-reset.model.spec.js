'use strict';

var should = require('should'),
  _ = require('lodash'),
  db,
  models;

describe('Password Reset Model', function () {
  before(function (done) {
    require('../../database').connect(function (database) {
      db = database;
      models = require('../../models')(database);
      done();
    });
  });

  beforeEach(function (done) {
      done();
  });

  it("should pass as dummy test", function (done) {
    done();
  });
});
