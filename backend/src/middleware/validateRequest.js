
const validateTodoSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (err) {
        next(err);
    }
};

const validateUserSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};
module.exports = {
    validateTodoSchema,
    validateUserSchema,
};
