const Joi = require('joi');

const RegisterSchema = Joi.object({
    // isGoogleAccount: Joi.string().valid('Y', 'N').required(),
    // fullname: Joi.string().required(),
    // email: Joi.string().email().required(),
    // username: Joi.when('isGoogleAccount', {
    //     is: 'Y',
    //     then: Joi.string().optional(),
    //     otherwise: Joi.string().required()
    // }),
    // password: Joi.when('isGoogleAccount', {
    //     is: 'Y',
    //     then: Joi.string().optional(),
    //     otherwise: Joi.string().required()
    // }),
    // reTypePassword: Joi.when('isGoogleAccount', {
    //     is: 'Y',
    //     then: Joi.string().optional(),
    //     otherwise: Joi.string().required()
    // }),
    // role: Joi.when('isGoogleAccount', {
    //     is: 'Y',
    //     then: Joi.string().optional(),
    //     otherwise: Joi.string().required()
    // }),
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    reTypePassword: Joi.string().valid(Joi.ref('password')).required(),
    role: Joi.string().required(),
});

module.exports = { RegisterSchema };
