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
        password:
          "$2b$12$kw3WxwLEniVLifJIBk.q/edmvpn5ZlbbX7JaOXeqBZGVw9fhuVIim",
        phone: null,
        fullname: "admin",
        image_url: null,
        gender: "male",
        createdAt: "2023-09-12 11:45:08",
        updatedAt: "2023-09-12 20:44:43",
        isActive: 1,
      },
      {
        id: 2,
        role: 2,
        username: "Cashier001",
        email: null,
        password:
          "$2b$12$IXj111lrVZLsUiRMltskXehqPVfr9..m0kD5TFwn.eo123kdnFddq",
        phone: null,
        fullname: "cashier001",
        image_url: null,
        gender: "male",
        createdAt: "2023-09-12 11:45:08",
        updatedAt: "2023-09-13 18:06:13",
        isActive: 1,
      },
      {
        id: 15,
        role: 2,
        username: "CSH-Bante",
        email: null,
        password:
          "$2b$12$2kcgWT.o/Uok8VziqTW/.eWUnWrXKnDDbHhbdQzqCtU0nHW0oyfei",
        phone: null,
        fullname: "Bante",
        image_url: null,
        gender: "male",
        createdAt: "2023-09-12 17:59:40",
        updatedAt: "2023-09-13 11:18:13",
        isActive: 0,
      },
      {
        id: 17,
        role: 2,
        username: "CSH-Gaje",
        email: null,
        password:
          "$2b$12$3f6fHV6z9R3tTh6w1UZxGuJPi9hiwpUctPeHvX1Bx1GTdnQ8/2M/K",
        phone: null,
        fullname: "Gaje",
        image_url: null,
        gender: "male",
        createdAt: "2023-09-12 18:02:46",
        updatedAt: "2023-09-13 14:09:33",
        isActive: 1,
      },
      {
        id: 18,
        role: 2,
        username: "CSH-Coco",
        email: null,
        password:
          "$2b$12$B7cDVfLqmnvaZGULNOkkRe79MVOPLR/kJHJqkXfLYpPxdx0541sH2",
        phone: null,
        fullname: "Coco",
        image_url: null,
        gender: "male",
        createdAt: "2023-09-12 18:03:49",
        updatedAt: "2023-09-12 18:03:49",
        isActive: 1,
      },
      {
        id: 19,
        role: 2,
        username: "CSH-Monte",
        email: null,
        password:
          "$2b$12$XmwfoUQNQoLCw9AzHxtMbOMT2RxOE8i7eYsfBufTu7915c5cTPwTS",
        phone: null,
        fullname: "Monte",
        image_url: null,
        gender: "male",
        createdAt: "2023-09-12 18:04:42",
        updatedAt: "2023-09-14 09:09:42",
        isActive: 1,
      },
      {
        id: 28,
        role: 2,
        username: "deleteiniboleh",
        email: null,
        password:
          "$2b$12$H5FTfXM2R48U3mDqAN1xUuo2VqwI.Tb2kVKm6DtbT3Vbo3CUmp.8a",
        phone: null,
        fullname: "deleteiniboleh",
        image_url: null,
        gender: "male",
        createdAt: "2023-09-13 14:09:55",
        updatedAt: "2023-09-13 14:09:55",
        isActive: 1,
      },
      {
        id: 55,
        role: 2,
        username: "1234561",
        email: null,
        password:
          "$2b$12$qNTJdPvLKg/jBA7guH.PSuMeB9qTWXiJsmhctoBIDUORt8qVlXoze",
        phone: null,
        fullname: "delete ini boleh",
        image_url: null,
        gender: "male",
        createdAt: "2023-09-13 14:27:12",
        updatedAt: "2023-09-13 14:27:12",
        isActive: 1,
      },
      {
        id: 57,
        role: 2,
        username: "aaaa_aaa",
        email: null,
        password:
          "$2b$12$IdeZGqlz6KVvD89i8EH5B.eJx1Ucd0a3jnvvrBa8ylYlSFDIQF9ma",
        phone: null,
        fullname: "/^(\\w|-)+$/",
        image_url: null,
        gender: "male",
        createdAt: "2023-09-13 14:48:45",
        updatedAt: "2023-09-13 14:48:45",
        isActive: 1,
      },
      {
        id: 58,
        role: 2,
        username: "anjaaay",
        email: null,
        password:
          "$2b$12$kNtg.s6E9SuPaksE.j1ufuEqbW3LW2/GOxnKC/jG0rR1kKdwpdgHG",
        phone: null,
        fullname: "formik.resetForm();",
        image_url: null,
        gender: "male",
        createdAt: "2023-09-13 14:57:55",
        updatedAt: "2023-09-13 14:57:55",
        isActive: 1,
      },
      {
        id: 59,
        role: 2,
        username: "anjaaaay",
        email: null,
        password:
          "$2b$12$/.SsT3QkJI7aYo1kOtsP5u7d106ghjImUi6d0REDRlutRXBctH3tK",
        phone: null,
        fullname: "anjaaaay",
        image_url: null,
        gender: "male",
        createdAt: "2023-09-13 14:58:16",
        updatedAt: "2023-09-14 10:02:31",
        isActive: 0,
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
