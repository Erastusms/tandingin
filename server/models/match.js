'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Match.belongsTo(models.Team);
      Match.belongsTo(models.Fixture);
    }
  }
  Match.init({
    score: DataTypes.INTEGER,
    status: DataTypes.STRING,
    category: DataTypes.STRING,
    TeamId: DataTypes.UUID,
    FixtureId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};