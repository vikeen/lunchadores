'use strict';

var express = require('express'),
    router = express.Router(),
    TagsController = require('../../controllers/Tags.js'),
    handlers = require('../../components/helpers').handlers;

router.get('/', function (req, res) {
    handlers.request(TagsController.getAllTags(), req, res);
});

module.exports = router;
