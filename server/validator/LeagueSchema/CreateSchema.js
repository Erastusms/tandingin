const Joi = require('joi');

const CreateSchema = Joi.object({
    name: Joi.string().required(),
    quota: Joi.number().required(),
    description: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().min(Joi.ref('startDate')).required(),
    isLocked: Joi.boolean().required(),
    key: Joi.when('isLocked', {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string().allow(null, '').optional(),
    }),
    prize: Joi.string().required(),
}).unknown(true);

module.exports = { CreateSchema };
