'use strict';

var uuid = require('uuid');

module.exports = function (db) {
  db.define('password_reset', {
    user_id: String,
    verification_id: String,
    created_at: {type: 'date', time: true},
    updated_at: {type: 'date', time: true}
  }, {
    hooks: {
      beforeCreate: function () {
        this.created_at = new Date();
        this.verification_id = this.verification_id || uuid.v4();
      },
      beforeSave: function () {
        this.verification_id = this.verification_id || uuid.v4();
        this.updated_at = new Date();
      }
    }
  });
};
