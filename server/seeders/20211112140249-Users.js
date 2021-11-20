"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "skagns211@gmail.com",
        password: "930211",
        name: "kimnamhun",
        nickname: "BMW",
        birth: "930211",
        mobile: "01066043674",
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "ionc635@gmail.com",
        password: "941021",
        name: "kimjongseo",
        nickname: "AUDI",
        birth: "941021",
        mobile: "01095151257",
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
