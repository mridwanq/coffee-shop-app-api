"use strict";
const bcrypt = require("bcrypt");
const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */
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
    await queryInterface.bulkInsert("Users", [
      {
        role: 2,
        username: "cashier",
        email: "",
        password: await bcrypt.hash("cashier123", 12),
        phone: "",
        fullname: "cashier001",
        image_url: "",
        gender: "male",
        updatedAt: sequelize.fn("NOW"),
        createdAt: sequelize.fn("NOW"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
