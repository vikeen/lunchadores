module.exports = {
  request: _requestHandler,
  success: _successHandler,
  error: _errorHandler
};

// Public

function _requestHandler(promise, req, res) {
  promise.then(function (data) {
    _successHandler(data, req, res);
  }).catch(function (error) {
    _errorHandler(error, req, res);
  });
}

// Private

function _errorHandler(error, req, res) {
  console.error(error);
  if (res) {
    res.status(500).end();
  }
}

function _successHandler(data, req, res) {
  res.status(200).json(data);
}

