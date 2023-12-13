const Joi = require('joi');

const RegisterSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    reTypePassword: Joi.string().valid(Joi.ref('password')).required(),
    role: Joi.string().valid('ADMIN', 'MEMBER').required(),
});

module.exports = { RegisterSchema };
