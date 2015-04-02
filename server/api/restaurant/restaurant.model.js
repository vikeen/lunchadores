'use strict';

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
      },
      beforeSave: function() {
        this.updated_at = new Date();
      }
    }
  });
};
