'use strict';

module.exports = function (sequelize, DataTypes) {
    var RestaurantsTags = sequelize.define('restaurants_tags', {
        restaurant_id: DataTypes.INTEGER,
        tag_id: DataTypes.INTEGER,
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        }
    }, {
        timestamps: true,
        updatedAt: false,
        underscored: true,
        tableName: 'restaurants_tags'
    });

    return RestaurantsTags;
};
