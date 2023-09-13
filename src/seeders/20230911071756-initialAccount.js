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
        id: 1,
        role: 1,
        username: "admin",
        email: null,
        password: await bcrypt.hash("1adminCoffeeShop@", 12),
        phone: null,
        fullname: "admin",
        image_url: null,
        gender: "male",
        isActive: true,
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
