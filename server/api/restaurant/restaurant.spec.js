'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

var Restaurant = require('./restaurant.model');
var User = require('../user/user.model');

// var restaurant = new Restaurant({
//   name: 'Fake Restaurant',
//   address: 'Fake Address',
//   lat: 39.1420553,
//   lng: -94.5768657,
//   active: true,
//   outside_seating: true
// });

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

describe('GET /api/restaurants', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/restaurants')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('POST /api/restaurants', function() {

  it('should respond with an unauthorized error', function(done) {
    request(app)
      .post('/api/restaurants')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  // it('should respond with an unauthorized error', function(done) {
  //   request(app)
  //     .post('/api/restaurants')
  //     .expect(200)
  //     .end(function(err, res) {
  //       if (err) return done(err);
  //       done();
  //     });
  // });
});
