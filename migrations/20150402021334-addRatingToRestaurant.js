var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function(db, callback) {
  db.addColumn('restaurant', 'rating', {
      type: 'decimal', defaultValue: 0
  }, callback());
};

exports.down = function(db, callback) {
  db.removeColumn('restaurant', 'rating', callback());
};
