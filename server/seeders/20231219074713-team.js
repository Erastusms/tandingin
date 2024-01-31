/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const teams = JSON.parse(
      fs.readFileSync('./seeders/data/teams.json', 'utf8')
    );
    const teamsData = teams.map((team) => {
      const { LeagueId } = team;
      return {
        id: uuidv4(),
        ...team,
        status: 'Approved',
        logo: 'images/ImageNotSet.png',
        LeagueId: LeagueId ?? 'a1392408-0823-4474-920c-5fd1d74be66e',
        UserId: 'c9fba6ed-5068-4669-9e23-562d0458be07',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await queryInterface.bulkInsert('Teams', teamsData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Teams', null, {});
  }
};
