'use strict';

var _ = require('lodash');

module.exports = {
  hasValidIdParam: hasValidIdParam,
  hasValidTagsPayload: hasValidTagsPayload
};

var REQUIRED_RESTAURANT_ID = 'Missing required restaurant id',
  REQUIRED_RESTAURANT_TAGS = 'Missed required restaurant tags',
  INVALID_RESTAURANT_TAGS = 'Invalid restaurant tags'
  ;

function handleError(res, status, message) {
  console.error(message);
  res.send(status, {
    status: status,
    message: message
  });
}

function hasValidIdParam(req, res, next) {
  if (req.params.id && parseInt(req.params.id, 10)) {
    next();
  } else {
    handleError(res, 500, REQUIRED_RESTAURANT_ID);
  }
}

function hasValidTagsPayload(req, res, next) {
  if (req.body.tags) {
    if (_.isArray(req.body.tags)) {
      next();
    } else {
      return handleError(res, 500, INVALID_RESTAURANT_TAGS);
    }
  } else {
    return handleError(res, 500, REQUIRED_RESTAURANT_TAGS);
  }
}
