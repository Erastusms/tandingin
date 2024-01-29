const Joi = require('joi');

const ListLeagueSchema = Joi.object({
    page: Joi.number().default(1).optional(),
    pageSize: Joi.number().default(4).optional(),
});

module.exports = { ListLeagueSchema };
