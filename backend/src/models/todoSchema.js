const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    note: { type: String },
    tags: { type: [String] },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
    },
    dateCreated: { type: Date, default: Date.now },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
    Todo,
};
