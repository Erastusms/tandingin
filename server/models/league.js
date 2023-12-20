'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class League extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      League.belongsTo(models.User);
      League.hasMany(models.Team);
    }
  }
  League.init({
    name: DataTypes.STRING,
    quota: DataTypes.INTEGER,
    quota_available: DataTypes.INTEGER,
    description: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    status: DataTypes.STRING,
    prize: DataTypes.INTEGER,
    logo: DataTypes.STRING,
    is_locked: DataTypes.BOOLEAN,
    key: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
    UserId: DataTypes.UUID,
  }, {
    hooks: {
      beforeCreate: (league, options) => {
        league.id = uuidv4();
      },
    },
    sequelize,
    modelName: 'League',
  });
  return League;
};