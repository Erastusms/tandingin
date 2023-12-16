// const Joi = require('joi');
const validator = (schema, property) => {
    return (req, res, next) => {
        // console.log(req[property])
        const { error } = schema.validate(req[property]);
        console.log(error);
        const valid = error == null;
        if (valid) { next(); }
        else {
            const { details } = error;
            const errorMessage = details[0].message;
            res.status(422).json({ error: errorMessage.replace(/['"]/g, "") })
        }
    }
}
module.exports = validator;