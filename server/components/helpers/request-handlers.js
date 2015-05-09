module.exports = requestHandler;

// Public

function requestHandler(req, res) {
  return function (error, data) {
    if (error) {
      _errorHandler(error);
    } else {
      _successHandler(data, req, res)
    }
  }
}

// Private

function _errorHandler(error) {
  console.error(error);
  throw error;
}

function _successHandler(data, req, res) {
  res.send(data);
}

