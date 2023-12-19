const { failActionHandler } = require("./ValidationHelper");
const validator = (schema, property) => {
    return (req, res, next) => {
        // const { error } = schema.validate(req[property]);
        const { error } = schema.validate(req[property]);
        const valid = error == null;
        if (valid) { next(); }
        else {
            const errorDetails = failActionHandler(error);
            res.status(422).json(errorDetails)

            // const errorMessage = details[0].message;
            // res.status(422).json({ error: errorMessage.replace(/['"]/g, "") })
        }
    }
}
module.exports = validator;