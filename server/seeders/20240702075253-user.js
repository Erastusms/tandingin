/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { encrypter } = require("../helpers/bcrypt");

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
    const users = JSON.parse(
      fs.readFileSync("./seeders/data/users.json", "utf8")
    );
    const usersData = users.map((user) => {
      const { password } = user;
      return {
        id: uuidv4(),
        ...user,
        password: encrypter(password),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("Users", usersData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
