'use strict';

var _ = require('lodash'),
  models = require('../../models');

module.exports = {
  getAllTags: getAllTags
};

/************************/
// Public API
/************************/

// Get list of active restaurants
function getAllTags() {
  return models.tag.findAll();
}

/************************/
// Private API
/************************/
