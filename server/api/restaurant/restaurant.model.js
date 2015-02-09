'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  active: { type: Boolean, default: false },
  outside_seating: { type: Boolean, default: false },
  ratings: {
    type: [
      {
        user_id: { type: String, required: true },
        rating: { type: Number, required: true }
      }
    ],
    default: []
  },
  number_of_ratings: { type: Number, default: 0 },
  average_rating: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Restaurant', RestaurantSchema);
