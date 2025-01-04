// migrations/20241222204114-add-options-to-questions.js
'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Questions', 'options', {
      type: Sequelize.JSON, // Use JSON type for PostgreSQL
      allowNull: false, // Set to false if you want to enforce that options must be provided
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Questions', 'options');
  }
};