const Joi = require("joi");

const ListSchema = Joi.object({
  status: Joi.string().valid("Approved", "Rejected", "Pending").required(),
  LeagueId: Joi.string().required()
});

module.exports = { ListSchema };
