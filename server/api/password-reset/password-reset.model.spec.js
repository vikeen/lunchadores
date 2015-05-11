'use strict';

var should = require('should'),
  _ = require('lodash'),
  db,
  models;

describe('Password Reset Model', function () {
  before(function (done) {
    require('../../database').connect(function (database) {
      db = database;
      require('../../models')(database, function() {
        models = db.models;
        done();
      });
    });
  });

  beforeEach(function (done) {
      done();
  });

  it("should pass as dummy test", function (done) {
    done();
  });
});
