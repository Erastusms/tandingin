const Joi = require("joi");

const CreateSchema = Joi.object({
  name: Joi.string().required(),
  shortname: Joi.string().required(),
}).unknown(true);

module.exports = { CreateSchema };
