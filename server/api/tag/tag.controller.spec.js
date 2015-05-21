"use strict";

var should = require('should'),
  _ = require('lodash'),
  Promise = require('bluebird'),
  models = require('../../models'),
  tagController = require('./tag.controller');

var mockTags = [
  {
    id: 1,
    name: 'vegan',
    readable_name: 'Vegan'
  }, {
    id: 2,
    name: 'vegan2',
    readable_name: 'Vegan2'
  }, {
    id: 3,
    name: 'vegan1',
    readable_name: 'Vegan1'
  }
];

describe('Tag Controller', function () {
  before(function (done) {
    done();
  });

  beforeEach(function (done) {
    return Promise.all([
      models.tag.destroy({where: {}}).then(function () {
        return models.tag.bulkCreate(mockTags, {individualHooks: true});
      })
    ]).then(function () {
      done();
    }).catch(console.error)
  });

  it('should get all tags', function (done) {
    tagController.getAllTags().then(function (tags) {
      tags.should.have.lengthOf(3);
      done();
    }).catch(console.error)
  });
});
