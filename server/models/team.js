'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsTo(models.League);
      Team.belongsTo(models.User);
      Team.hasMany(models.Match);
    }
  }
  Team.init({
    name: DataTypes.STRING,
    shortname: DataTypes.STRING,
    logo: DataTypes.STRING,
    status: DataTypes.STRING,
    UserId: DataTypes.UUID,
    LeagueId: DataTypes.UUID,
  }, {
    hooks: {
      beforeCreate: (team, options) => {
        team.id = uuidv4();
      },
    },
    sequelize,
    modelName: 'Team',
  });
  return Team;
};