'use strict';

var models = require('../models');

module.exports = {
    getAllTags: getAllTags
};

/************************/
// Public API
/************************/

// Get list of active restaurants
function getAllTags() {
    return models.tags.findAll();
}

/************************/
// Private API
/************************/
