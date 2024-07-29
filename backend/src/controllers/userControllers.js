const { User } = require("../models/userSchema");

const { jwtToken } = require("../utils/jwt");
const registerUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(200).json({
            message: "user created succesfully",
            user: newUser,
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    const user = req.user;

    try {
        const token = jwtToken(user);
        res.status(200).json({
            message: `${user.username} logged in succesfully...`,
            token,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
};
