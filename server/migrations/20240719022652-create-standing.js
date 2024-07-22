"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Standings", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      TeamId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      played: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      won: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      drawn: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      lost: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      goals_for: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      goals_against: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      goal_difference: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      LeagueId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Standings");
  },
};
