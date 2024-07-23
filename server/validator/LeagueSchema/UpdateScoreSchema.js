const Joi = require("joi");

const UpdateScoreSchema = Joi.object({
  matchId: Joi.string().required(),
  teamAId: Joi.string().required(),
  teamBId: Joi.string().required(),
  teamAScore: Joi.number().required(),
  teamBScore: Joi.number().required(),
});

module.exports = { UpdateScoreSchema };
