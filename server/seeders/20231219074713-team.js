'use strict';

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let teams = JSON.parse(
      fs.readFileSync("./seeders/data/teams.json", "utf8")
    );
    let teamsData = teams.map((team) => {
      const { LeagueId } = team;
      return {
        id: uuidv4(),
        ...team,
        status: 'Approved',
        logo: 'images/ImageNotSet.png',
        LeagueId: LeagueId ?? 'ea9d5473-757a-421b-b4f8-1306e11a5022',
        UserId: 'c9fba6ed-5068-4669-9e23-562d0458be07',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("Teams", teamsData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Teams", null, {});
  }
};
