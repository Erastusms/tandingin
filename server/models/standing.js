"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Standing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Standing.belongsTo(models.Team, { foreignKey: "TeamId" });
      Standing.belongsTo(models.League, { foreignKey: "LeagueId" });
    }
  }
  Standing.init(
    {
      TeamId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Teams",
          key: "id",
        },
      },
      played: DataTypes.INTEGER,
      won: DataTypes.INTEGER,
      drawn: DataTypes.INTEGER,
      lost: DataTypes.INTEGER,
      goals_for: DataTypes.INTEGER,
      goals_against: DataTypes.INTEGER,
      goal_difference: DataTypes.INTEGER,
      points: DataTypes.INTEGER,
      LeagueId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "League",
          key: "id",
        },
      },
    },
    {
      hooks: {
        beforeCreate: (standing, options) => {
          standing.id = uuidv4();
        },
        beforeBulkCreate: (standing, options) => {
          return standing.map((stand) => {
            stand.id = uuidv4();
          });
        },
      },
      sequelize,
      modelName: "Standing",
    }
  );
  return Standing;
};
