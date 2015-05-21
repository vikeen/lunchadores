'use strict';

var _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  var Tag = sequelize.define('tag', {
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
        Tag.belongsToMany(models.restaurant, {
          through: 'restaurants_tags',
          foreignKey: 'tag_id'
        });
      }
    }
  });

  return Tag;
};
