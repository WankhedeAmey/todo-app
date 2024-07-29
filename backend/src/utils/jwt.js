const jwt = require("jsonwebtoken");

const jwtToken = (user) => {
    console.log({
        id: user._id,
        username: user.username,
    });
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET_KEY
    );

    return token;
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = {
    jwtToken,
    verifyToken,
};
