/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird'),
    models = require('../../app/models');

module.exports = function (callback) {
    return _seedDatabaseTable(models.users, 'users').then(function () {
        return _seedDatabaseTable(models.password_resets, 'password-resets').then(function () {
            console.log('finished seeding database');
            if (callback) {
                callback();
            }
        });
    });
};

function _errorHandler(err) {
    console.log('');
    console.log('==============================');
    console.error(err);
    console.log('==============================');
    console.log('');

    throw err;
}

function _getJSONFileData(fileName) {
    var jsonData = fs.readFileSync(path.join(__dirname, fileName + '.json'), 'utf8');
    return JSON.parse(jsonData);
}

function _seedDatabaseTable(model, seedFileName) {
    return model.findAll().then(function () {
        return model.destroy({where: {}}).then(function () {
            return model.bulkCreate(_getJSONFileData(seedFileName), {individualHooks: true})
                .then(function (password_resets) {
                    console.log('finished populating', seedFileName);
                    return Promise.resolve();
                }).catch(_errorHandler);
        });
    });
}
