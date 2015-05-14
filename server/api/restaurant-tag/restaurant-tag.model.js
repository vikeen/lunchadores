'use strict';

var _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  var RestaurantTag = sequelize.define('restaurant_tag', {
    restaurant_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER,
    created_at: {type: DataTypes.DATE},
    updated_at: {type: DataTypes.DATE}
  }, {
    timestamps: false,
    tableName: 'restaurants_tags',

    hooks: {
      beforeCreate: function (restaurantTag) {
        restaurantTag.created_at = new Date();
      },
      beforeUpdate: function (restaurantTag) {
        restaurantTag.updated_at = new Date();
      }
    }
  });

  return RestaurantTag;
};
