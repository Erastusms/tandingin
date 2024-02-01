const Joi = require('joi');

const CreateSchema = Joi.object({
  name: Joi.string().required(),
  shortname: Joi.string().required()
});

module.exports = { CreateSchema };
