const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { encrypter } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your fullname'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your username'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Role is required'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = encrypter(user.password);
        user.id = uuidv4();
      },
      beforeUpdate: (user, options) => {
        user.password = encrypter(user.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
