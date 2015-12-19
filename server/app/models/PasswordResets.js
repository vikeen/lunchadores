'use strict';

var uuid = require('uuid');

module.exports = function (sequelize, DataTypes) {
  var PasswordResets = sequelize.define('password_resets', {
    user_id: {
      type: DataTypes.INTEGER,
      unique: true
    },
    verification_id: {
      type: DataTypes.STRING,
      unique: true
    },
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
      beforeCreate: function (password_reset) {
        password_reset.created_at = new Date();
        password_reset.verification_id = password_reset.verification_id || uuid.v4();
      },
      beforeSave: function (password_reset) {
        password_reset.verification_id = password_reset.verification_id || uuid.v4();
        password_reset.updated_at = new Date();
      }
    }
  });

  return PasswordResets;
};
