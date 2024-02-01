const Joi = require('joi');

const ListLeagueSchema = Joi.object({
  page: Joi.number().integer().optional(),
  pageSize: Joi.number().integer().optional(),
});

module.exports = { ListLeagueSchema };
