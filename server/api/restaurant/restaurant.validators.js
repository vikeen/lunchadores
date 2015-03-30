'use strict';

var REQUIRED_RESTAURANT_ID = 'Missing required restaurant id',
  INVALID_RESTAURANT_ID = 'Invalid restaurant id',
  REQUIRED_RESTAURANT_RATING = 'Missing required restaurant rating',
  INVALID_RESTAURANT_RATING = 'Invalid restaurant rating'
  ;

function handleError(res, status, message) {
  res.send(status, {
    status: status,
    message: message
  });
}

function hasValidIdParam(req, res, next) {
  if (req.params.id) {
    if (parseInt(req.params.id, 10)) {
      next();
    } else {
      handleError(res, 500, INVALID_RESTAURANT_ID);
    }
  } else {
    handleError(res, 500, REQUIRED_RESTAURANT_ID);
  }
}

function hasValidRatingParam(req, res,next) {
  if (req.params.rating) {
    if (parseInt(req.params.rating, 10)) {
      next();
    } else {
      handleError(res, 500, INVALID_RESTAURANT_RATING);
    }
  } else {
    handleError(res, 500, REQUIRED_RESTAURANT_RATING);
  }
}

module.exports = {
  hasValidIdParam: hasValidIdParam,
  hasValidRatingParam: hasValidRatingParam
};
