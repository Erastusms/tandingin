const { League, User, Team } = require('../models');
const {
    convertObjectToSnakeCase,
    convertObjectToCamelCase,
} = require('../helpers/ResponseHelpers');
const { successResponse } = require('../response');

class MemberController {
    static async create(req, res, next) {
        try {
            let file = req.file;
            const id = req.params.LeagueId

            const { name, shortname } = req.body;
            const findLeague = await League.findByPk(id);
            if (!findLeague) return res.status(404).json({
                message: 'League not found'
            })

            await Team.create({
                name,
                shortname,
                logo: file ? file.filename : "blank.png",
                status: 'Waiting Approval',
                LeagueId: id,
            })

            return successResponse(res, 201, 'Team successfully created');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = MemberController;
