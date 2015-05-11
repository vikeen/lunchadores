'use strict';

var _ = require('lodash');

module.exports = function (db) {
  return db.define('restaurant', {
    name: String,
    street: String,
    city: String,
    state: String,
    state_abbreviation: String,
    country: String,
    country_abbreviation: String,
    zipcode: String,
    formatted_address: String,
    lat: Number,
    lng: Number,
    active: Boolean,
    rating: Number,
    vegan: Boolean,
    vegetarian: Boolean,
    outside_seating: Boolean,
    created_at: {type: 'date', time: true},
    updated_at: {type: 'date', time: true}
  }, {
    hooks: {
      beforeCreate: function () {
        this.created_at = new Date();
        this.active = _.isBoolean(this.active) ? this.active : true;
        this.vegan = _.isBoolean(this.vegan) ? this.vegan : false;
        this.vegetarian = _.isBoolean(this.vegetarian) ? this.vegetarian : false;
        this.rating = _.isNumber(this.rating) ? this.rating : 0;
      },
      beforeSave: function () {
        this.updated_at = new Date();
      }
    }
  });
};
