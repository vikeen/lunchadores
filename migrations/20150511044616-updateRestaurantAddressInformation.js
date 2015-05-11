var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function (db, callback) {
  async.series([
    db.renameColumn('restaurant', 'address', 'formatted_address'),
    db.addColumn('restaurant', 'street', {type: 'string', notNull: true}),
    db.addColumn('restaurant', 'city', {type: 'string', notNull: true}),
    db.addColumn('restaurant', 'state', {type: 'string', notNull: true}),
    db.addColumn('restaurant', 'state_abbreviation', {type: 'string', notNull: true, length: 10}),
    db.addColumn('restaurant', 'country', {type: 'string', notNull: true}),
    db.addColumn('restaurant', 'country_abbreviation', {type: 'string', notNull: true, length: 10}),
    db.addColumn('restaurant', 'zipcode', {type: 'string', notNull: true, length: 32})
  ], callback());
};

exports.down = function (db, callback) {
  async.series([
    db.renameColumn('restaurant', 'formatted_address', 'address'),
    db.removeColumn('restaurant', 'street'),
    db.removeColumn('restaurant', 'city'),
    db.removeColumn('restaurant', 'state'),
    db.removeColumn('restaurant', 'state_abbreviation'),
    db.removeColumn('restaurant', 'country'),
    db.removeColumn('restaurant', 'country_abbreviation'),
    db.removeColumn('restaurant', 'zipcode')
  ], callback());
};
