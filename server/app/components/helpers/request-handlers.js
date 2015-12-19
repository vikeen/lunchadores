module.exports = {
    request: requestHandler,
    success: successHandler,
    error: errorHandler
};

function requestHandler(promise, req, res) {
    promise.then(function (data) {
        successHandler(data, req, res);
    }).catch(function (error) {
        errorHandler(error, req, res);
    });
}

function errorHandler(error, req, res) {
    console.error("ERROR:", error);
    if (res) {
        return res.status(500);
    }
}

function successHandler(data, req, res) {
    return res.status(200).json(data);
}

