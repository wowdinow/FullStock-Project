'use strict';

const { hashPass } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let user = [{
      email: "user1@mail.com",
      password: hashPass("user1"),
      createdAt: new Date(),
      updatedAt: new Date()
    }]

    await queryInterface.bulkInsert("Users", user, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  }
};
