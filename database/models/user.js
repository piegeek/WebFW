'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Post, {
				foreignKey: 'userId',
				as: 'Posts'
			});
			User.hasMany(models.RefreshToken, {
				foreignKey: 'userId',
				as: 'RefreshTokens'
			});
			User.hasMany(models.VerificationCode, {
				foreignKey: 'userId',
				as: 'VerificationCodes'
			});

		}
	};
	User.init({
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			isEmail: true
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		verified: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		sequelize,
		modelName: 'User',
	});

	return User;
};