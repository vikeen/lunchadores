'use strict';

var should = require('should'),
    models = require('../../app/models');

var mockTags = [
    {
        id: 1,
        name: 'vegan',
        readable_name: 'Vegan'
    }
];

describe('Tags Model', function () {
    before(function (done) {
        done();
    });

    beforeEach(function (done) {
        models.tags.destroy({where: {}}).then(function () {
            models.tags.bulkCreate(mockTags, {individualHooks: true}).then(function () {
                done();
            }).catch(console.error)
        });
    });

    it('should be a functional model', function (done) {
        models.tags.findById(mockTags[0].id).then(function (tag) {
            tag.should.have.property('name', mockTags[0].name);
            tag.should.have.property('readable_name', mockTags[0].readable_name);
            done();
        }).catch(console.error)
    });
});
