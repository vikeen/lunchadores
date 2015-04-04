'use strict';

var _ = require('lodash'),
    orm = require('orm'),
    crypto = require('crypto');

function camelizeString(string) {
  var result = "";
  _.forEach(string.split('_'), function(item, index) {
    if (index === 0) {
      result += item;
    } else {
      result += item.substr(0, 1).toUpperCase() + item.substr(1);
    }
  });
  return result;
}

function camelizeObject(object) {
  _.forEach(_.keys(object), function(key) {
    if (typeof key === 'string') {
      var newKey = camelizeString(key);

      if (newKey !== key) {
        object[camelizeString(key)] = object[key];
        delete object[key];
      }
    }
  });

  return object;
}

function makeSalt() {
  return crypto.randomBytes(16).toString('base64');
}

function encryptPassword(password, salt) {
  var salt = new Buffer(salt, 'base64');
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
}

module.exports = function(db) {
  db.define('user', {
    first_name: String,
    last_name: String,
    email_address: String,
    provider: String,
    role: String,
    salt: String,
    password: String,
    active: Boolean,
    created_at: { type: 'date', time: true },
    updated_at: { type: 'date', time: true }
  }, {
    hooks: {
      beforeCreate: function() {
        this.created_at = new Date();
        this.email_address = this.email_address.toLowerCase();
        this.salt = makeSalt();
        this.password = encryptPassword(this.password, this.salt);
      },
      beforeSave: function() {
        this.updated_at = new Date();
        this.email_address = this.email_address.toLowerCase();
      }
    },
    validations: {
      email_address: orm.enforce.unique('email already taken')
    },
    methods: {
      changePassword: function(newPassword) {
        this.salt = makeSalt();
        this.password = encryptPassword(this.password, this.salt);
      },
      authenticate: function(plainTextPassword) {
          return encryptPassword(plainTextPassword, this.salt) === this.password;
      },
      fullName: function() {
        return this.first_name + ' ' + this.last_name;
      },
      profile: function(isOwnUser) {
        var user = _.cloneDeep(this);
        delete user.password;
        delete user.salt;
        user.full_name = this.fullName();
        return camelizeObject(user);
      }
    }
  });
};
