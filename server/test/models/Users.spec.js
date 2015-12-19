'use strict';

var should = require('should'),
    _ = require('lodash'),
    models = require('../../app/models');

var mockUsers = [{
    id: 1,
    first_name: 'Admin',
    last_name: 'User',
    email_address: 'admin@admin.com',
    provider: 'local',
    role: 'admin',
    active: true,
    password: 'password'
}];

describe('Users Model', function () {
    before(function (done) {
        done();
    });

    beforeEach(function (done) {
        models.users.destroy({where: {}}).then(function () {
            models.users.bulkCreate(mockUsers, {individualHooks: true}).then(function (users) {
                done();
            }).catch(function (err) {
                console.log(err);
            });
        });
    });

    it("should authenticate user if password is valid", function (done) {
        models.users.findOne({where: {id: mockUsers[0].id}}).then(function (user) {
            user.authenticate('password').should.be.true;
            done();
        }).catch(function (err) {
            console.log(err);
        });
    });
//
    it("should authenticate user if password is invalid", function (done) {
        models.users.findOne({where: {id: mockUsers[0].id}}).then(function (user) {
            user.authenticate('invalid password').should.be.false;
            done();
        }).catch(function (err) {
            console.log(err);
        });
    });

    it("should change password", function (done) {
        models.users.findOne({where: {id: mockUsers[0].id}}).then(function (user) {
            user.authenticate('password').should.be.true;
            user.changePassword('newPassword');

            user.save().then(function () {
                user.authenticate('password').should.be.false;
                user.authenticate('newPassword').should.be.true;
                done();
            }).catch(function (err) {
                console.log(err);
            });
        });
    });

    it('should lower case the email_address', function (done) {
        var newUser = _.cloneDeep(mockUsers[0]);
        var upperCaseEmail = newUser.email_address = 'NEW@EMAIL.COM';
        newUser.id = mockUsers.length + 1;

        models.users.create(newUser).then(function (user) {
            user.should.have.property('first_name', newUser.first_name);
            user.should.have.property('last_name', newUser.last_name);
            user.should.have.property('email_address', upperCaseEmail.toLowerCase());
            done();
        }).catch(function (err) {
            console.log(err);
        });
    });

    it('should return full name of user', function (done) {
        models.users.findOne({where: {id: mockUsers[0].id}}).then(function (user) {
            user.should.have.property('first_name', mockUsers[0].first_name);
            user.should.have.property('last_name', mockUsers[0].last_name);
            should(user.full_name).be.equal(mockUsers[0].first_name + ' ' + mockUsers[0].last_name);
            done();
        }).catch(function (err) {
            console.log(err);
        });
    });

    it('should not return password or salt', function (done) {
        models.users.findOne({where: {id: mockUsers[0].id}}).then(function (user) {
            user = user.profile();
            user.should.not.have.property('password');
            user.should.not.have.property('salt');
            user.should.have.property('first_name', mockUsers[0].first_name);
            user.should.have.property('last_name', mockUsers[0].last_name);
            done();
        }).catch(function (err) {
            console.log(err);
        });
    });

    it("should reject duplicate email addresses", function (done) {
        var newUser = _.cloneDeep(mockUsers[0]);
        newUser.id = mockUsers.length + 1;

        models.users.create(newUser).catch(function (err) {
            should(err).not.be.null;
            done();
        });
    });
});
