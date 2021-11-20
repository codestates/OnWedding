"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comments", [
      {
        user_id: 1,
        article_id: 1,
        message: "응원합니다!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        article_id: 2,
        message: "치킨 먹고싶다",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        article_id: 1,
        message: "ㅊㅋㅊㅋ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        article_id: 2,
        message: "ㄱㅅㄱㅅ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
