const express = require("express");
const router = express.Router();
const {
    hashPassword,
    verifyPassword,
} = require("../../middleware/hashMiddleware");

const { validateUserSchema } = require("../../middleware/validateRequest");
const { zodUserSchema } = require("../../utils/validation");
const {
    registerUser,
    loginUser,
} = require("../../controllers/userControllers");

router.post(
    "/register",
    validateUserSchema(zodUserSchema),
    hashPassword,
    registerUser
);
router.post("/login", verifyPassword, loginUser);

module.exports = router;
