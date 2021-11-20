"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Article_Hashtags", [
      {
        hashtag_id: 1,
        article_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hashtag_id: 1,
        article_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
