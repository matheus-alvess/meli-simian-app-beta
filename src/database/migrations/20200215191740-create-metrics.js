module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('metrics', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      is_simian: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        default: new Date(),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        default: new Date(),
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('metrics');
  },
};
