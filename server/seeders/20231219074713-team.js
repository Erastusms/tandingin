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
        logo: 'ImageNotSet.png',
        LeagueId: LeagueId ?? '29272733-8593-4290-b88c-e0b232081b36',
        UserId: '851487d7-63de-42b2-a9f5-8ab55cb1ea4f',
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
