'use strict';

module.exports = function (sequelize, DataTypes) {
    var Tags = sequelize.define('tags', {
        name: DataTypes.STRING,
        readable_name: DataTypes.STRING,
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
                Tags.belongsToMany(models.restaurants, {
                    through: 'restaurants_tags',
                    foreignKey: 'tag_id'
                });
            }
        }
    });

    return Tags;
};
