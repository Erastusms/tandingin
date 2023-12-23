const Joi = require('joi');

const UpdateScoreSchema = Joi.object({
    fixturesId: Joi.string().required(),
    teamAScore: Joi.number().required(),
    teamBScore: Joi.number().required(),
});

module.exports = { UpdateScoreSchema };
