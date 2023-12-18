const { League, User, Team } = require('../models');
const {
    convertObjectToSnakeCase,
    convertObjectToCamelCase,
} = require('../helpers/ResponseHelpers');
const { successResponse } = require('../response');
// const fs = require("fs-extra");
// const path = require("path");
// const randomstring = require("randomstring");

class AdminController {
    static async create(req, res, next) {
        try {
            let file = req.file;
            const id = req.userData.id;
            const users = await User.findByPk(id);

            const { name, quota, description, startDate, endDate, prize } =
                req.body;

            const findLeagueName = await League.findOne({
                where: { name },
            });

            if (findLeagueName) {
                return res.status(403).json({
                    message: 'League already exist!',
                });
            }

            const dataConvert = convertObjectToSnakeCase(req.body)
            await League.create({
                ...dataConvert,
                logo: file ? file.filename : "blank.png",
                status: 'open',
                createdBy: users.username,
                updatedBy: users.username,
                UserId: users.id
            })

            return successResponse(res, 201, 'League successfully created');
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        // const UserId = req.userData.id;
        const LeagueId = req.params.leagueId;
        const file = req.file;
        // const users = await User.findByPk({ id: UserId });
        const { name, quota, description, startDate, endDate, prize } =
            req.body;
        try {
            const dataConvert = convertObjectToSnakeCase(req.body)
            await League.update(
                {
                    ...dataConvert,
                    // logo: file ? file.filename : "blank.png",
                },
                { where: { id: LeagueId } }
            );

            return res.status(200).json(successResponse('League successfully updated'));
        } catch (err) {
            next(err)
        }
    }

    static async updateLogo(req, res, next) {
        const LeagueId = req.params.leagueId;
        const file = req.file;
        try {
            await League.update(
                {
                    logo: file ? file.filename : "blank.png",
                },
                { where: { id: LeagueId } }
            );

            return res.status(200).json(successResponse('Logo successfully updated'));
        } catch (err) {
            next(err)
        }
    }

    static async viewListLeague(req, res, next) {
        try {
            const leagues = await League.findAll({
                include: [Team]
            })
            return res.status(200).json(leagues);
        } catch (err) {
            next(err)
        }
    }
}

module.exports = AdminController;
