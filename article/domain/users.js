const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      freezeTableName: true,
      paranoid: true,
      timestamps: true,
    }
  );

  return users;
};
