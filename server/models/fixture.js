'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Fixture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fixture.hasMany(models.Team);
      Fixture.belongsTo(models.League);
    }
  }
  Fixture.init({
    name: DataTypes.STRING,
    score: DataTypes.INTEGER,
    status: DataTypes.STRING,
    category: DataTypes.STRING,
    TeamId: DataTypes.UUID,
    LeagueId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'Fixture',
  });
  return Fixture;
};