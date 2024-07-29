import { useFormik } from "formik";
import { todoFilterAtom, todoSortAtom } from "../store/atoms/todoAtom";
import { useSetRecoilState } from "recoil";

const Filter = () => {
    const setTodoFilter = useSetRecoilState(todoFilterAtom);
    const setTodoSort = useSetRecoilState(todoSortAtom);
    const formik = useFormik({
        initialValues: {
            status: "",
            priority: "",
            sort: "",
        },
        onSubmit: (values, { resetForm }) => {
            const filterQuery = {};
            const sortQuery = {};

            if (values.status === "completed") {
                filterQuery.status = true;
            } else filterQuery.status = false;
            filterQuery.priority = values.priority;

            if (values.sort !== "ascending") {
                sortQuery.descending = true;
                sortQuery.ascending = false;
            } else {
                sortQuery.descending = false;
                sortQuery.ascending = true;
            }

            setTodoFilter(filterQuery);
            setTodoSort(sortQuery);
        },
    });

    return (
        <div className="mt-10 flex items-center justify-center">
            <form
                onSubmit={formik.handleSubmit}
                className="p-8 bg-slate-800 text-gray-200 rounded-lg shadow-lg flex flex-col space-y-4 w-80 hover:shadow-slate-200 hover:shadow-xl"
            >
                <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center neon-text">
                    Filter Todos
                </h2>

                <div className="flex flex-row justify-start space-x-4 items-center">
                    <label
                        htmlFor="status"
                        className="text-lg text-yellow-400 neon-text"
                    >
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        {...formik.getFieldProps("status")}
                        className="bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:border-yellow-400 neon-focus outline-none"
                    >
                        <option value="not-completed">Not Completed</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="flex flex-row justify-start space-x-4 items-center">
                    <label
                        htmlFor="priority"
                        className="text-lg text-green-400 neon-text"
                    >
                        Priority
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        {...formik.getFieldProps("priority")}
                        className="bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:border-green-400 neon-focus outline-none"
                    >
                        <option value="">Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="flex flex-row justify-start space-x-4 items-center">
                    <label
                        htmlFor="sort"
                        className="text-lg text-pink-400 neon-text"
                    >
                        Sort
                    </label>
                    <select
                        id="sort"
                        name="sort"
                        {...formik.getFieldProps("sort")}
                        className="bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:border-pink-400 neon-focus outline-none"
                    >
                        <option value="">Sort by Date Created</option>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>

                <button
                    className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 focus:bg-blue-800 neon-button"
                    type="submit"
                >
                    Filter
                </button>
            </form>
        </div>
    );
};

export default Filter;
