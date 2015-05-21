'use strict';

var _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  var RestaurantTag = sequelize.define('restaurant_tag', {
      restaurant_id: DataTypes.INTEGER,
      tag_id: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      }
    },
    {
      timestamps: true,
      updatedAt: false,
      underscored : true,
      tableName: 'restaurants_tags'
    });

  return RestaurantTag;
};
