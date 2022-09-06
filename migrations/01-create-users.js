require("dotenv").config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "users",
      {
        userId: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          allowNull: false,
        },
        name: {
          type: Sequelize.DataTypes.STRING(10),
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
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("users");
  },
};
