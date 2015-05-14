'use strict';

var Promise = require("bluebird");

module.exports = {
  up: function (migration, DataTypes, done) {
    migration.createTable('password_reset', {
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      user_id: {
        type: DataTypes.INTEGER,
        references: 'user',
        referencesKey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      verification_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_at: {type: DataTypes.DATE, allowNull: false},
      updated_at: {type: DataTypes.DATE, allowNull: true}
    }).then(function () {
      done();
    })
  },
  done: function (migration, DataTypes, done) {
    migration.dropTable('password_reset').then(function () {
      done();
    })
  }
};
