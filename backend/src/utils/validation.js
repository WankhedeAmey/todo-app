const { z } = require("zod");

// Define Zod schema for Todo
const zodTodoSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    completed: z.boolean().default(false),
    dueDate: z.string().date().nullable().optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
});

const zodUserSchema = z.object({
    username: z
        .string()
        .min(6, { message: "Username must be 6 or more characters long..." }),
    password: z
        .string()
        .min(8, { message: "Password must be 8 or more characters long..." }),
});

module.exports = {
    zodTodoSchema,
    zodUserSchema,
};
