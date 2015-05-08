var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function (db, callback) {
  async.series([
    db.createTable('password_reset', {
      id: {type: 'int', primaryKey: true, autoIncrement: true},
      user_id: {type: 'int', notNull: true},
      verification_id: {type: 'string', notNull: true},
      created_at: {type: 'datetime', notNull: true},
      updated_at: {type: 'datetime', notNull: true}
    }),
    db.addForeignKey('password_reset', 'user', 'password_reset_user_id_fk',
      {
        'user_id': 'id'
      },
      {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      })
  ], callback());
};

exports.down = function (db, callback) {
  db.dropTable('password_reset', callback());
};
