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
      Fixture.hasMany(models.Match);
      Fixture.belongsTo(models.League);
    }
  }
  Fixture.init({
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    LeagueId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'Fixture',
  });
  return Fixture;
};