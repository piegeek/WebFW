'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class RefreshToken extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			RefreshToken.belongsTo(models.User, {
				foreignKey: 'userId',
				onDelete: 'CASCADE'
			});
		}
	};
	RefreshToken.init({
		userId: DataTypes.INTEGER,
		tokenVal: DataTypes.STRING,
		createDate: DataTypes.DATE,
		expireDate: DataTypes.DATE
	}, {
		sequelize,
		modelName: 'RefreshToken',
	});
	return RefreshToken;
};