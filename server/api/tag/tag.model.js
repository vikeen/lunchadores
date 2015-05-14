'use strict';

var _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  var Tag = sequelize.define('tag', {
    name: DataTypes.STRING,
    readable_name: DataTypes.STRING,
    created_at: {type: DataTypes.DATE},
    updated_at: {type: DataTypes.DATE}
  }, {
    timestamps: false,
    freezeTableName: true,

    hooks: {
      beforeCreate: function (tag) {
        tag.created_at = new Date();
      },
      beforeUpdate: function (tag) {
        tag.updated_at = new Date();
      }
    }
  });

  return Tag;
};
[]
