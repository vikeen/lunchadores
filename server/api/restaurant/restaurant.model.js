'use strict';

var _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  var Restaurant = sequelize.define('restaurant', {
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    state_abbreviation: DataTypes.STRING,
    country: DataTypes.STRING,
    country_abbreviation: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    formatted_address: {
      type: DataTypes.STRING,
      unique: true
    },
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    active: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    timestamps: false,
    freezeTableName: true,

    hooks: {
      beforeCreate: function (restaurant) {
        restaurant.created_at = new Date();
      },
      beforeUpdate: function (restaurant) {
        restaurant.updated_at = new Date();
      }
    }
  });

  return Restaurant;
};
