'use strict';

var _ = require('lodash'),
  crypto = require('crypto');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email_address: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    provider: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    timestamps: true,
    freezeTableName: true,

    hooks: {
      beforeCreate: function (user) {
        user.email_address = user.email_address.toLowerCase();
        user.salt = _makeSalt();
        user.password = _encryptPassword(user.password, user.salt);
      },
      beforeSave: function (user) {
        user.email_address = user.email_address.toLowerCase();
      }
    },
    getterMethods: {
      full_name: function () {
        return this.getDataValue('first_name') + ' ' + this.getDataValue('last_name');
      }
    },
    setterMethods: {},
    instanceMethods: {
      authenticate: function (plainTextPassword) {
        return _encryptPassword(plainTextPassword, this.getDataValue('salt')) === this.getDataValue('password');
      },
      changePassword: function (newPassword) {
        this.setDataValue('salt', _makeSalt());
        this.setDataValue('password', _encryptPassword(newPassword, this.getDataValue('salt')));
      },
      profile: function (isOwnUser) {
        return {
          active: this.active,
          id: this.id,
          created_at: this.created_at,
          email_address: this.email_address,
          first_name: this.first_name,
          full_name: this.full_name,
          last_name: this.last_name,
          provider: this.provider,
          role: this.role,
          updated_at: this.updated_at
        };
      }
    }
  });

  return User;
};

/*
 * Private API
 */

function _makeSalt() {
  return crypto.randomBytes(16).toString('base64');
}

function _encryptPassword(password, salt) {
  salt = new Buffer(salt, 'base64');
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
}
