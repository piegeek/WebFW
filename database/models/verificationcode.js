'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class VerificationCode extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			VerificationCode.belongsTo(models.User, {
				foreignKey: 'userId',
				onDelete: 'CASCADE'
			});
		}
	};
	VerificationCode.init({
		codeVal: DataTypes.STRING,
		userId: {
			type: DataTypes.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
					as: 'userId'
				},
			onDelete: 'CASCADE'
		} 
	}, {
		sequelize,
		modelName: 'VerificationCode',
	});
	return VerificationCode;
};