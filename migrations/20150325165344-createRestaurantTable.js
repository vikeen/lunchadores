'use strict';

module.exports = {
  up: function (migration, DataTypes, done) {
    migration.createTable('restaurant', {
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      name: {type: DataTypes.STRING, allowNull: false},
      street: {type: DataTypes.STRING, allowNull: false},
      city: {type: DataTypes.STRING, allowNull: false},
      state: {type: DataTypes.STRING, allowNull: false},
      state_abbreviation: {type: DataTypes.STRING, allowNull: false, length: 10},
      country: {type: DataTypes.STRING, allowNull: false},
      country_abbreviation: {type: DataTypes.STRING, allowNull: false, length: 10},
      zipcode: {type: DataTypes.STRING, allowNull: false, length: 32},
      formatted_address: {type: DataTypes.STRING, allowNull: false, unique: true},
      lat: {type: DataTypes.DECIMAL, allowNull: false},
      lng: {type: DataTypes.DECIMAL, allowNull: false},
      active: {type: DataTypes.BOOLEAN, defaultValue: true},
      rating: {type: DataTypes.DECIMAL, defaultValue: 0},
      created_at: {type: DataTypes.DATE, allowNull: false},
      updated_at: {type: DataTypes.DATE, allowNull: true}
    }).then(function () {
      done();
    });
  },
  down: function (migration, DataTypes, done) {
    migration.dropTable('restaurant').then(function () {
      done();
    });
  }
};
