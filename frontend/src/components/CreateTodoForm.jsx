import { useFormik } from "formik";
import { todoSubmittedAtom } from "../store/atoms/todoAtom";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const validate = (values) => {
    const errors = {};
    if (!values.title) {
        errors.title = "Title is required";
    }
    return errors;
};

const CreateTodoForm = () => {
    const navigate = useNavigate();
    const setTodoSubmitted = useSetRecoilState(todoSubmittedAtom);
    const formik = useFormik({
        initialValues: {
            title: "",
            note: "",
            tags: "",
            dueDate: "",
            priority: "",
        },
        validate,
        onSubmit: async (values, { resetForm }) => {
            const payload = {};
            payload.priority = "medium";
            for (const [key, value] of Object.entries(values)) {
                if (value) payload[key] = value;
            }

            payload.tags = values.tags.split(" ");

            try {
                const token = localStorage.getItem("token");
                const response = await axios.post(
                    "http://localhost:3000/api/todos/",
                    payload,
                    {
                        headers: {
                            Authorization: `bearer ${token}`,
                        },
                    }
                );
                setTodoSubmitted((prev) => !prev);
            } catch (error) {
                navigate("/error", {
                    state: {
                        error: error.response
                            ? error.response.data
                            : error.message,
                    },
                });
            }
            resetForm();
        },
    });

    return (
        <div className="mx-auto p-8 bg-slate-800 text-gray-200 rounded-lg shadow-lg w-[40%] hover:shadow-slate-200 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center">
                Create Todo
            </h2>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col space-y-4"
            >
                <label htmlFor="title" className="text-lg text-yellow-400">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    {...formik.getFieldProps("title")}
                    className={`outline-none bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:border-yellow-400 ${
                        formik.touched.title && formik.errors.title
                            ? "border-red-500"
                            : ""
                    }`}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-500 text-sm">
                        {formik.errors.title}
                    </div>
                ) : null}

                <label htmlFor="note" className="text-lg text-green-400">
                    Note
                </label>
                <input
                    id="note"
                    type="text"
                    {...formik.getFieldProps("note")}
                    className="outline-none bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:border-green-400"
                />

                <label htmlFor="tags" className="text-lg text-pink-400">
                    Tags
                </label>
                <input
                    id="tags"
                    type="text"
                    {...formik.getFieldProps("tags")}
                    className="outline-none bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:border-pink-400"
                />

                <label htmlFor="dueDate" className="text-lg text-purple-400">
                    Due Date
                </label>
                <input
                    id="dueDate"
                    type="date"
                    {...formik.getFieldProps("dueDate")}
                    className="outline-none bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:border-purple-400"
                />

                <label htmlFor="priority" className="text-lg text-cyan-400">
                    Priority
                </label>
                <select
                    id="priority"
                    {...formik.getFieldProps("priority")}
                    className="outline-none bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:border-cyan-400"
                >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 focus:bg-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateTodoForm;
