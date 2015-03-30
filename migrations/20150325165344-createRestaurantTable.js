var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('restaurant', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    name: {type: 'string', notNull: true},
    address: {type: 'string', notNull: true},
    lat: {type: 'decimal', notNull: true},
    lng: {type: 'decimal', notNull: true},
    active: {type: 'boolean', default: true},
    outside_seating: {type: 'boolean', default: false},
    created_at: {type: 'datetime', notNull: true},
    updated_at: {type: 'datetime', notNull: true}
  }, callback());
};

exports.down = function(db, callback) {
  db.dropTable('restaurant', callback());
};
