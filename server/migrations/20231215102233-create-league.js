'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Leagues', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING
      },
      quota: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      prize: {
        type: Sequelize.INTEGER
      },
      logo: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.STRING
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedBy: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Leagues');
  }
};