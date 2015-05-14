'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
    queryInterface.removeColumn('restaurant', 'rating').then(function () {
      done();
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.addColumn('restaurant', 'rating', {type: DataTypes.DECIMAL, defaultValue: 0}).then(function () {
      done();
    });
  }
};
