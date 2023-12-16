const Joi = require('joi');

const CreateSchema = Joi.object({
    name: Joi.string().required(),
    quota: Joi.number().required(),
    description: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().min(Joi.ref('startDate')).required(),
    prize: Joi.string().required(),
});

module.exports = { CreateSchema };
