"use strict";

var should = require('should'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    models = require('../../app/models'),
    usersController = require('./../../app/controllers/Users.js');

describe('Users Controller', function () {
    var mockUsers = [];

    before(function (done) {
        return models.users.destroy({where: {}}).then(function () {
            done();
        });
    });

    beforeEach(function (done) {
        mockUsers = [{
            "id": 1,
            "provider": "local",
            "role": "user",
            "first_name": "Admin",
            "last_name": "Admin",
            "email_address": "admin@admin.com",
            "password": "admin"
        }];

        return models.users.destroy({where: {}}).then(function () {
            return models.users.bulkCreate(mockUsers, {individualHooks: true});
        }).then(function () {
            done();
        }).catch(console.error);
    });

    describe("getAllUsers()", function () {
        it('should get all users', function (done) {
            return usersController.getAllUsers().then(function (users) {
                users.should.have.lengthOf(1);
                users[0].should.not.have.property('password');
                done();
            });
        });
    });

    describe("me()", function () {
        it('should get a single user', function (done) {
            return usersController.me(mockUsers[0].id).then(function (user) {
                user.should.have.property('email_address', mockUsers[0].email_address);
                user.should.not.have.property('password');
                done();
            });
        });
    });

    describe("deleteUserById()", function () {
        it('should delete user by id', function (done) {
            return usersController.deleteUserById(mockUsers[0].id).then(function () {
                done();
            });
        });
    });

    describe('changePassword()', function () {
        it('should change a user\'s password', function (done) {
            var payload = {
                id: mockUsers[0].id,
                oldPassword: mockUsers[0].password,
                newPassword: 'new password'
            };

            return usersController.changePassword(payload).then(function (user) {
                done();
            });
        });

        it('should error if the payload cannot authenticate the user', function (done) {
            var payload = {
                id: mockUsers[0].id,
                oldPassword: 'fake password',
                newPassword: 'new password'
            };

            return usersController.changePassword(payload)
                .catch(function (e) {
                    e.should.be.equal('User failed authentication check for password reset');
                    done();
                });
        });
    });

    describe("updateUser()", function () {
        it('should change a user\'s password', function (done) {
            var payload = {
                id: mockUsers[0].id,
                first_name: "Fred"
            };

            return usersController.updateUser(payload).then(function (user) {
                user.should.have.property("first_name", "Fred");
                user.should.not.have.property('password');
                done();
            });
        });
    });

    describe("createUser()", function () {
        it("should create a user with default role'", function (done) {
            var newUser = _.cloneDeep(mockUsers[0]);
            newUser.id = mockUsers.length + 1;
            newUser.email_address = "bogus@fake.com";

            return usersController.createUser(newUser).then(function () {
                return usersController.getUserById(newUser.id).then(function (user) {
                    user.should.have.property("provider", "local");
                    user.should.have.property("role", "user");
                    user.should.not.have.property('password');
                    done();
                });
            }).catch(console.error);
        });

        it("should create an admin user", function (done) {
            var newUser = _.cloneDeep(mockUsers[0]);
            newUser.id = mockUsers.length + 2;
            newUser.email_address = "bogus@fake1.com";
            newUser.role = 'admin';

            return usersController.createUser(newUser).then(function () {
                return usersController.getUserById(newUser.id).then(function (user) {
                    user.should.have.property("provider", "local");
                    user.should.have.property("role", "admin");
                    user.should.not.have.property('password');
                    done();
                });
            }).catch(console.error);
        });
    });
});
