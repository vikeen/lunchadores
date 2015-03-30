var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('user', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    first_name: {type: 'string', notNull: true},
    last_name: {type: 'string', notNull: true},
    email_address: {type: 'string', notNull: true},
    provider: {type: 'string', notNull: true},
    role: {type: 'string', notNull: true},
    salt: {type: 'string', notNull: true},
    password: {type: 'string', notNull: true},
    active: {type: 'boolean', default: true},
    created_at: {type: 'datetime', notNull: true},
    updated_at: {type: 'datetime', notNull: true}
  }, callback());
};

exports.down = function(db, callback) {
  db.dropTable('user', callback());
};
