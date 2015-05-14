'use strict';

module.exports = {
  up: function (migration, DataTypes, done) {
    migration.createTable('user', {
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      first_name: {type: DataTypes.STRING, allowNull: false},
      last_name: {type: DataTypes.STRING, allowNull: false},
      email_address: {type: DataTypes.STRING, allowNull: false, unique: true},
      provider: {type: DataTypes.STRING, allowNull: false},
      role: {type: DataTypes.STRING, allowNull: false},
      salt: {type: DataTypes.STRING, allowNull: false},
      password: {type: DataTypes.STRING, allowNull: false},
      active: {type: DataTypes.BOOLEAN, defaultValue: true},
      created_at: {type: DataTypes.DATE, allowNull: false},
      updated_at: {type: DataTypes.DATE, allowNull: true}
    }).then(function () {
      done();
    });
  },
  done: function (migration, DataTypes, done) {
    migration.dropTable('user').then(function () {
      done();
    });
  }
};

