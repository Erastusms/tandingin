const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsTo(models.User);
      Team.belongsTo(models.League, { foreignKey: "LeagueId" });
      Team.belongsToMany(models.Match, {
        through: models.TeamMatch,
        foreignKey: "TeamId",
        otherKey: "MatchId",
      });
    }
  }
  Team.init(
    {
      name: DataTypes.STRING,
      shortname: DataTypes.STRING,
      logo: DataTypes.STRING,
      status: DataTypes.STRING,
      LeagueId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Leagues",
          key: "id",
        },
      },
      UserId: DataTypes.UUID,
    },
    {
      hooks: {
        beforeCreate: (team, options) => {
          team.id = uuidv4();
        },
      },
      sequelize,
      modelName: "Team",
    }
  );
  return Team;
};
