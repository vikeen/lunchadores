'use strict';

var should = require('should'),
  _ = require('lodash'),
  db,
  models;

var mockUsers = [
  {
    id: 1,
    first_name: 'Admin',
    last_name: 'User',
    email_address: 'admin@admin.com',
    provider: 'local',
    role: 'admin',
    active: true,
    password: 'password'
  }
];

describe('User Model', function () {
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
    models.user.find({}).remove(function () {
      models.user.create(mockUsers, function (err, users) {
        done();
      });
    });
  });

  it("should authenticate user if password is valid", function (done) {
    models.user.get(mockUsers[0].id, function (err, user) {
      user.authenticate('password').should.be.true;
      done();
    });
  });

  it("should authenticate user if password is invalid", function (done) {
    models.user.get(mockUsers[0].id, function (err, user) {
      user.authenticate('invalid password').should.be.false;
      done();
    });
  });

  it("should change password", function (done) {
    models.user.get(mockUsers[0].id, function (err, user) {
      user.authenticate('password').should.be.true;
      user.changePassword('newPassword');

      user.save(function (err) {
        user.authenticate('password').should.be.false;
        user.authenticate('newPassword').should.be.true;
        done();
      });
    });
  });

  it('should lower case the email_address', function (done) {
    var newUser = new models.user(mockUsers[0]);
    var upperCaseEmail = newUser.email_address.toUpperCase();
    newUser.id = mockUsers.length + 1;
    newUser.email_address = upperCaseEmail;

    newUser.save(function (err, user) {
      user.should.have.property('first_name', newUser.first_name);
      user.should.have.property('last_name', newUser.last_name);
      user.should.have.property('email_address', upperCaseEmail.toLowerCase());
      done();
    });
  });

  it('should return full name of user', function (done) {
    models.user.get(mockUsers[0].id, function (err, user) {
      user = user.profile();
      user.should.have.property('first_name', mockUsers[0].first_name);
      user.should.have.property('last_name', mockUsers[0].last_name);
      user.should.have.property('full_name', mockUsers[0].first_name + ' ' + mockUsers[0].last_name);
      done();
    });
  });

  it('should not return password or salt', function (done) {
    models.user.get(mockUsers[0].id, function (err, user) {
      user = user.profile();
      user.should.not.have.property('password');
      user.should.not.have.property('salt');
      user.should.have.property('first_name', mockUsers[0].first_name);
      user.should.have.property('last_name', mockUsers[0].last_name);
      done();
    });
  });

  it("should reject duplicate email addresses", function (done) {
    var newUser = _.clone(mockUsers[0]);
    newUser.id = mockUsers.length + 1;
    newUser = new models.user(newUser);
    newUser.save(function (err, user) {
      err.should.not.be.null;
      done();
    });
  });
});
