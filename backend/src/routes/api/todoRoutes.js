const express = require("express");
const todoController = require("../../controllers/todoControllers");
const router = express.Router();
const { zodTodoSchema } = require("../../utils/validation");
const { validateTodoSchema } = require("../../middleware/validateRequest");
const { authenticateToken } = require("../../middleware/authMiddleware");

//get all the routes
router.get("/", authenticateToken, todoController.getTodos);

//create a todo
router.post(
    "/",
    authenticateToken,
    validateTodoSchema(zodTodoSchema),
    todoController.createTodo
);

//mark todo as completed
router.put("/updateTodo/:id", authenticateToken, todoController.updateTodo);

module.exports = router;
