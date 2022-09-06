require("dotenv").config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable(
        "articles",
        {
          sequenceId: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          articleId: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            allowNull: false,
          },
          userId: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            allowNull: false,
          },
          title: {
            type: Sequelize.DataTypes.STRING(20),
            allowNull: false,
          },
          content: {
            type: Sequelize.DataTypes.STRING(200),
            allowNull: false,
          },
          password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
          },
          deletedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
          },
        },
        {
          charset: "utf8mb4",
          collate: "utf8mb4_general_ci",
          paranoid: true,
          timestamps: true,
          freezeTableName: true,
        }
      )
      .then(() => {
        queryInterface.addIndex("articles", ["userId"]);
      });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("articles");
  },
};
