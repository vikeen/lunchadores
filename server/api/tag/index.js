'use strict';

var express = require('express'),
  router = express.Router(),
  controller = require('./tag.controller'),
  handlers = require('../../components/helpers').handlers;

router.get('/', function (req, res) {
  handlers.request(controller.getAllTags(), req, res);
});

module.exports = router;
