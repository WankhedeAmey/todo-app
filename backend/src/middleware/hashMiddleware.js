const bcrypt = require("bcrypt");
const { User } = require("../models/userSchema");

//in signup
const hashPassword = async (req, res, next) => {
    const { password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
};

//in login
const verifyPassword = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error("Username not found");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Incorrect password");
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    verifyPassword,
    hashPassword,
};
