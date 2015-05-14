'use strict';

var uuid = require('uuid');

module.exports = function (sequelize, DataTypes) {
  var PasswordReset = sequelize.define('password_reset', {
    user_id: {
      type: DataTypes.INTEGER,
      unique: true
    },
    verification_id: {
      type: DataTypes.STRING,
      unique: true
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    timestamps: false,
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

  return PasswordReset;
};
