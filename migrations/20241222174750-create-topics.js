
'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Topics', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      subjectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Subjects', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', 
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Topics');
  },
};