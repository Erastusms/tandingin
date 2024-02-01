const { Op } = require('sequelize');
const { User, League, Team } = require('../models');
const { decrypter, encrypter } = require('../helpers/bcrypt');
const { tokenGenerator } = require('../helpers/jwt');
const {
  convertObjectToSnakeCase,
  convertObjectToCamelCase,
} = require('../helpers/ResponseHelpers');
const { successResponse } = require('../response');
const { authorizationUrl, getSyncGoogle } = require('../helpers/GoogleHelpers');
// const fs = require("fs-extra");
// const path = require("path");
// const randomstring = require("randomstring");

class UserController {
  static async register(req, res, next) {
    try {
      const findEmail = await User.findOne({
        where: { email: req.body.email.toLowerCase() },
      });

      if (findEmail) {
        return res.status(403).json({
          message: 'Email already exist!',
        });
      }

      await User.create({
        ...req.body
      });
      return successResponse(res, 'user successfully created', 201);
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      const data = await User.findAll({});
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });

      if (user) {
        if (decrypter(password, user.password)) {
          return successResponse(res, 'You are successfully logged in', 200, {
            access_token: tokenGenerator(user),
            role: user.role
          });
        }
        return res.status(403).json({
          message: 'Password is Invalid!',
        });
      }

      return res.status(404).json({
        message: 'User not found!',
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginWithGoogle(req, res) {
    return res.status(200).json({ url: authorizationUrl });
  }

  static async loginSyncWithGoogle(req, res) {
    const data = await getSyncGoogle(req.query.code);
    const { email, name, given_name } = data;

    const isEmailAlreadyExist = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!isEmailAlreadyExist) {
      await User.create({
        fullname: name,
        username: given_name,
        email,
        password: 'not set',
        role: 'MEMBER',
      });
    }

    const user = await User.findOne({
      where: { email },
    });
    // if (!data.email || !data.name) {
    //     return res.json({
    //         data: data,
    //     })
    // }

    // let user = await prisma.users.findUnique({
    //     where: {
    //         email: data.email
    //     }
    // })

    // if (!user) {
    //     user = await prisma.users.create({
    //         data: {
    //             name: data.name,
    //             email: data.email,
    //             address: "-"
    //         }
    //     })
    // }

    // const payload = {
    //     id: user?.id,
    //     name: user?.name,
    //     address: user?.address
    // }

    // const secret = process.env.JWT_SECRET!;

    // const expiresIn = 60 * 60 * 1;

    // const token = jwt.sign(payload, secret, { expiresIn: expiresIn })

    // return res.redirect(`http://localhost:3000/auth-success?token=${token}`)

    // return res.json({
    //     data: {
    //         id: user.id,
    //         name: user.name,
    //         address: user.address
    //     },
    //     token: token
    // })
    return successResponse(res, 'Successfully login!', {
      access_token: tokenGenerator(user),
      role: user.role
    });
  }

  static async profilePage(req, res, next) {
    try {
      const { id } = req.userData;
      const users = await User.findByPk(id);
      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async updateProfile(req, res) {
    try {
      await User.update(
        {
          ...req.body
        },
        { where: { id: req.userData.id }, individualHooks: true }
      );

      const userAfterUpdate = await User.findByPk(id);

      return res.status(200).json({
        status: 200,
        message: 'User data has been updated!',
        user: userAfterUpdate,
      });
    } catch (err) {
      next(err);
    }
  }

  static async search(req, res, next) {
    const { query } = req.query;
    try {
      const dataLeague = await League.findAll({
        where: {
          name: {
            [Op.iLike]: `%${query}%`
          }
        }
      });

      const dataTeam = await Team.findAll({
        where: {
          name: {
            [Op.iLike]: `%${query}%`
          }
        }
      });

      return successResponse(res, 'Show Data', 200, {
        League: dataLeague.map((data) => convertObjectToCamelCase(data.dataValues)),
        Team: dataTeam.map((data) => convertObjectToCamelCase(data.dataValues))
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
