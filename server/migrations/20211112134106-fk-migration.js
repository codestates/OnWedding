"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Comments", {
      fields: ["user_id"],
      type: "foreign key",
      references: {
        table: "Users",
        field: "id",
      },
    });
    await queryInterface.addConstraint("Comments", {
      fields: ["article_id"],
      type: "foreign key",
      references: {
        table: "Articles",
        field: "id",
      },
    });
    await queryInterface.addConstraint("Articles", {
      fields: ["user_id"],
      type: "foreign key",
      references: {
        table: "Users",
        field: "id",
      },
    });
    await queryInterface.addConstraint("Article_Hashtags", {
      fields: ["article_id"],
      type: "foreign key",
      references: {
        table: "Articles",
        field: "id",
      },
    });
    await queryInterface.addConstraint("Article_Hashtags", {
      fields: ["hashtag_id"],
      type: "foreign key",
      references: {
        table: "Hashtags",
        field: "id",
      },
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
