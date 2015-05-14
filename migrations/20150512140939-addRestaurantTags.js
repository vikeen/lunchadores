"use strict";

var path = require('path'),
  fs = require('fs'),
  Promise = require("bluebird");

module.exports = {
  up: function (migration, DataTypes, done) {
    migration.createTable('tag', {
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      name: {type: DataTypes.STRING, allowNull: false},
      readable_name: {type: DataTypes.STRING, allowNull: false},
      created_at: {type: DataTypes.DATE, allowNull: false},
      updated_at: {type: DataTypes.DATE, allowNull: true}
    }).then(function () {
      migration.createTable('restaurants_tags', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        restaurant_id: {
          type: DataTypes.INTEGER,
          references: 'restaurant',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        tag_id: {
          type: DataTypes.INTEGER,
          references: 'tag',
          referencesKey: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        created_at: {type: DataTypes.DATE, allowNull: false},
        updated_at: {type: DataTypes.DATE, allowNull: true}
      }).then(function () {
        migration.sequelize.query(_insertDefaultTags());
        done();
      })
    });
  },

  down: function (migration, DataTypes, done) {
    migration.dropTable('restaurants_tags').then(function () {
      migration.dropTable('tag')
    }).then(function () {
      done();
    })

  }
};

function _insertDefaultTags() {
  return [
    "INSERT INTO tag(name, readable_name, created_at, updated_at)",
    "VALUES ('vegan', 'Vegan', now(), now()),",
    "('vegetarian', 'Vegetarian', now(), now()),",
    "('outside_seating', 'Outside Seating', now(), now())",
    ";"
  ].join(' ');
}
