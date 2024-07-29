const { Todo } = require("../models/todoSchema");

//get todos
const getTodos = async (req, res, next) => {
    let todos = [];
    const userId = req.user.id;
    try {
        todos = await Todo.find({ userId });
        res.status(200).json({ todos: todos, username: req.user.username });
    } catch (err) {
        next(err);
    }
};

//create todos
const createTodo = async (req, res, next) => {
    const payload = req.body;
    const userId = req.user.id;
    try {
        const newTodo = new Todo({ ...payload, userId });
        await newTodo.save();
        res.status(200).json(newTodo);
    } catch (err) {
        next(err);
    }
};

const updateTodo = async (req, res, next) => {
    const { id } = req.params;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            {
                completed: true,
            },
            {
                new: true,
            }
        );

        if (!updatedTodo) {
            throw new Error("Todo with given id not found...");
        }

        res.json(updatedTodo);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
};
