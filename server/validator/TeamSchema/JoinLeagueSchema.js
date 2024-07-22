const Joi = require("joi");

const JoinLeagueSchema = Joi.object({
  LeagueId: Joi.string().required(),
  TeamId: Joi.string().required(),
  key: Joi.string().optional()
});

module.exports = { JoinLeagueSchema };
