var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function(db, callback) {
  async.series([
    db.changeColumn('restaurant', 'active', {
      type: 'boolean', defaultValue: true
    }),
    db.changeColumn('restaurant', 'outside_seating', {
      type: 'boolean', defaultValue: false
    }),
    db.changeColumn('user', 'active', {
      type: 'boolean', defaultValue: true
    })
  ], callback());
};

exports.down = function(db, callback) {
  async.series([
    db.changeColumn('restaurant', 'active', {
      type: 'boolean'
    }),
    db.changeColumn('restaurant', 'outside_seating', {
      type: 'boolean'
    }),
    db.changeColumn('user', 'active', {
      type: 'boolean'
    })
  ], callback());
};
