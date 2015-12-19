'use strict';

module.exports = {
    up: function (migration, Sequelize) {
        return migration.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            first_name: {type: Sequelize.STRING, allowNull: false},
            last_name: {type: Sequelize.STRING, allowNull: false},
            email_address: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            provider: {type: Sequelize.STRING, allowNull: false},
            role: {type: Sequelize.STRING, allowNull: false},
            salt: {type: Sequelize.STRING, allowNull: false},
            password: {type: Sequelize.STRING, allowNull: false},
            active: {type: Sequelize.BOOLEAN, defaultValue: true},
            created_at: {type: Sequelize.DATE, allowNull: false},
            updated_at: {type: Sequelize.DATE, allowNull: true}
        });
    },
    down: function (migration, Sequelize) {
        return migration.dropTable('users');
    }
};

