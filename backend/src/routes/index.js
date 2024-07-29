const express = require("express");
const router = express.Router();
const todoRoutes = require("./api/todoRoutes");
const userRoutes = require("./api/userRoutes");

router.use("/todos", todoRoutes);
router.use("/user", userRoutes);
module.exports = router;
