"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Articles", [
      {
        user_id: 1,
        title: "종서❤️태형",
        message: "둘의 사랑, 이루어 질 수 있을까요?",
        image: "",
        total_comment: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        title: "너무 어려워요",
        message: "하지만 재밌습니다",
        image: "",
        total_comment: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        title: "태형님 집 쳐들어가기",
        message: "파티원 모집중",
        image: "",
        total_comment: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        title: "치킨은",
        message: "뿌링클",
        image: "",
        total_comment: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Articles", null, {});
  },
};
