const { verifyToken } = require("../utils/jwt");

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    authenticateToken,
};
