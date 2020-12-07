const { INTEGER } = require("sequelize/types");
const { Sequelize, sequelize } = require(".");

const User = sequelize.define('User', {
    id:         {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    email:      { 
        type: Sequelize.STRING 
    },
    username:   {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password:   {
        type: sequelize.STRING,
        allowNull: false
    },
});

module.exports = User;