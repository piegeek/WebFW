const { Sequelize, sequelize } = require(".");
const User = require("./user");

const Post = sequelize.define('Post', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT
    },
    u_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
            model: 'users',
            key: 'id'
        }
    }
});

User.hasMany(Post);

module.exports = User;