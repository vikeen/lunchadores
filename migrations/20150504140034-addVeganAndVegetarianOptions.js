var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function (db, callback) {
  async.series([
    db.addColumn('restaurant', 'vegan', {
      type: 'boolean', defaultValue: false
    }),
    db.addColumn('restaurant', 'vegetarian', {
      type: 'boolean', defaultValue: false
    })
  ], callback());
};

exports.down = function (db, callback) {
  async.series([
    db.removeColumn('restaurant', 'vegan'),
    db.removeColumn('restaurant', 'vegetarian')
  ], callback());
};
