'use strict';

module.exports = {
    up: function (migration, Sequelize) {
        return migration.createTable('password_resets', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            verification_id: {
                type: Sequelize.STRING,
                allowNull: false
            },
            created_at: {type: Sequelize.DATE, allowNull: false},
            updated_at: {type: Sequelize.DATE, allowNull: true}
        });
    },
    down: function (migration, Sequelize) {
        return migration.dropTable('password_resets');
    }
};
