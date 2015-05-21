'use strict';

var should = require('should'),
  _ = require('lodash'),
  models = require('../../models');

var mockTags = [
  {
    id: 1,
    name: 'vegan',
    readable_name: 'Vegan'
  }
];

describe('Tag Model', function () {
  before(function (done) {
    done();
  });

  beforeEach(function (done) {
    models.tag.destroy({ where: {}}).then(function () {
      models.tag.bulkCreate(mockTags, {individualHooks: true}).then(function () {
        done();
      }).catch(console.error)
    });
  });

  it('should be a functional model', function (done) {
    models.tag.findById(mockTags[0].id).then(function (tag) {
      tag.should.have.property('name', mockTags[0].name);
      tag.should.have.property('readable_name', mockTags[0].readable_name);
      done();
    }).catch(console.error)
  });
});
