"use strict";

module.exports = {
    up: function (migration, Sequelize) {
        return migration.createTable('tags', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {type: Sequelize.STRING, allowNull: false},
                readable_name: {type: Sequelize.STRING, allowNull: false},
                created_at: {type: Sequelize.DATE, allowNull: false},
                updated_at: {type: Sequelize.DATE, allowNull: true}
            })
            .then(function () {
                return migration.createTable('restaurants_tags', {
                    id: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    restaurant_id: {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'restaurants',
                            key: 'id'
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE'
                    },
                    tag_id: {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'tags',
                            key: 'id'
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE'
                    },
                    created_at: {type: Sequelize.DATE},
                    updated_at: {type: Sequelize.DATE}
                });

            })
            .then(function () {
                var sql = defaultTagsInsertSql();
                return migration.sequelize.query(sql);
            });
    },

    down: function (migration, Sequelize) {
        return migration.dropTable('restaurants_tags')
            .then(function () {
                return migration.dropTable('tags');
            });

    }
};

function defaultTagsInsertSql() {
    return [
        "INSERT INTO tags(name, readable_name, created_at, updated_at)",
        "VALUES ('vegan', 'Vegan', now(), now()),",
        "('vegetarian', 'Vegetarian', now(), now()),",
        "('outside_seating', 'Outside Seating', now(), now())",
        ";"
    ].join(' ');
}
