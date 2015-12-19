"use strict";

var should = require('should'),
    Promise = require('bluebird'),
    models = require('../../app/models'),
    tagController = require('../../app/controllers/Tags');

var mockTags = [{
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
}];

describe('Tags Controller', function () {
    before(function (done) {
        done();
    });

    beforeEach(function (done) {
        return Promise.all([
            models.tags.destroy({where: {}}).then(function () {
                return models.tags.bulkCreate(mockTags, {individualHooks: true});
            })
        ]).then(function () {
            done();
        }).catch(console.error);
    });

    it('should get all tags', function (done) {
        tagController.getAllTags().then(function (tags) {
            tags.should.have.lengthOf(3);
            done();
        }).catch(console.error);
    });
});
