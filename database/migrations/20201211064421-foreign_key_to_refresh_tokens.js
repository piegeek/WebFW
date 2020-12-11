'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
		await queryInterface.addColumn('RefreshTokens', 'userId', {
			type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
					as: 'userId'
				},
			onDelete: 'CASCADE'
		});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('RefreshTokens', 'userId');
  }
};
