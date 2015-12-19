'use strict';

module.exports = {
    up: function (migration, Sequelize) {
        return migration.createTable('restaurants', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {type: Sequelize.STRING, allowNull: false},
            street: {type: Sequelize.STRING, allowNull: false},
            city: {type: Sequelize.STRING, allowNull: false},
            state: {type: Sequelize.STRING, allowNull: false},
            state_abbreviation: {
                type: Sequelize.STRING,
                allowNull: false,
                length: 10
            },
            country: {type: Sequelize.STRING, allowNull: false},
            country_abbreviation: {
                type: Sequelize.STRING,
                allowNull: false,
                length: 10
            },
            zipcode: {type: Sequelize.STRING, allowNull: false, length: 32},
            formatted_address: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            lat: {type: Sequelize.DECIMAL, allowNull: false},
            lng: {type: Sequelize.DECIMAL, allowNull: false},
            active: {type: Sequelize.BOOLEAN, defaultValue: true},
            rating: {type: Sequelize.DECIMAL, defaultValue: 0},
            created_at: {type: Sequelize.DATE, allowNull: false},
            updated_at: {type: Sequelize.DATE, allowNull: true}
        });
    },
    down: function (migration, Sequelize) {
        return migration.dropTable('restaurants');
    }
};
