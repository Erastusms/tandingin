const Joi = require("joi");

const SearchSchema = Joi.object({
  query: Joi.string().optional()
});

module.exports = { SearchSchema };
