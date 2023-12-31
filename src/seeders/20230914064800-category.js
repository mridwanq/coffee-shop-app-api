"use strict";

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
    await queryInterface.bulkInsert("Categories", [
      {
        id: 1,
        category_name: "Coffee",
        createdAt: sequelize.fn("NOW"),
        updatedAt: sequelize.fn("NOW"),
      },
      {
        id: 2,
        category_name: "Non-Coffee",
        createdAt: sequelize.fn("NOW"),
        updatedAt: sequelize.fn("NOW"),
      },
      {
        id: 3,
        category_name: "Pizza",
        createdAt: sequelize.fn("NOW"),
        updatedAt: sequelize.fn("NOW"),
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
