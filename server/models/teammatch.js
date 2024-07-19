"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TeamMatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TeamMatch.init(
    {
      TeamId: {
        type: DataTypes.UUID,
        references: {
          model: "Teams",
          key: "id",
        },
      },
      MatchId: {
        type: DataTypes.UUID,
        references: {
          model: "Match",
          key: "id",
        },
      },
      score: DataTypes.INTEGER,
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TeamMatch",
    }
  );
  return TeamMatch;
};
