const Joi = require('joi');

const ApprovalSchema = Joi.object({
  status: Joi.string().valid('Approved', 'Rejected').required(),
  TeamId: Joi.string().required(),
  LeagueId: Joi.string().required()
});

module.exports = { ApprovalSchema };
