const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Match.belongsTo(models.League, { foreignKey: "LeagueId" });
      Match.belongsToMany(models.Team, {
        through: models.TeamMatch,
        foreignKey: "MatchId",
        otherKey: "TeamId",
      });
    }
  }
  Match.init(
    {
      match_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      LeagueId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Leagues",
          key: "id",
        },
      },
    },
    {
      hooks: {
        beforeCreate: (match, options) => {
          match.id = uuidv4();
        },
      },
      sequelize,
      modelName: "Match",
    }
  );
  return Match;
};
