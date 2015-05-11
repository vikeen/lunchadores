module.exports = requestHandler;

// Public

function requestHandler(req, res) {
  return function (error, data) {
    if (error) {
      _errorHandler(error, req, res);
    } else {
      _successHandler(data, req, res)
    }
  }
}

// Private

function _errorHandler(error, req, res) {
  console.error(error);
  res.send(500);
}

function _successHandler(data, req, res) {
  res.send(data);
}

