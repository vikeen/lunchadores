'use strict';

var _ = require('lodash');

module.exports = function(db) {
  return db.define('restaurant', {
    name: String,
    address: String,
    lat: Number,
    lng: Number,
    active: Boolean,
    rating: Number,
    outside_seating: Boolean,
    created_at: {type: 'date', time: true},
    updated_at: {type: 'date', time: true}
  }, {
    hooks: {
      beforeCreate: function() {
        this.created_at = new Date();
        this.active = _.isBoolean(this.active) ? this.active : true;
        this.rating = _.isNumber(this.rating) ? this.rating : 0;
      },
      beforeSave: function() {
        this.updated_at = new Date();
      }
    }
  });
};
