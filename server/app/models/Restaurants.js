'use strict';

module.exports = function (sequelize, DataTypes) {
    var Restaurants = sequelize.define('restaurants', {
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
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        classMethods: {
            associate: function (models) {
                Restaurants.belongsToMany(models.tags, {
                    through: 'restaurants_tags',
                    foreignKey: 'restaurant_id'
                });
            }
        }
    });

    return Restaurants;
};