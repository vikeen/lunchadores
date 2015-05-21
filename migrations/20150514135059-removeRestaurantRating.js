'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
    queryInterface.removeColumn('restaurant', 'rating').then(function () {
      done();
    });
  },

  down: function (queryInterface, Sequelize, done) {
    queryInterface.addColumn('restaurant', 'rating', {type: Sequelize.DECIMAL, defaultValue: 0}).then(function () {
      done();
    });
  }
};
