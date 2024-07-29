import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { showCompletedAtom, todoListAtomGlobal } from "../store/atoms/todoAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const IncompleteTodo = (props) => {
    const navigate = useNavigate();
    let { id, title, note, tags, dueDate, priority } = props;
    const setTodos = useSetRecoilState(todoListAtomGlobal);

    const showCompleted = useRecoilValue(showCompletedAtom);

    const handleClick = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:3000/api/todos/updateTodo/${id}`,
                null,
                {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                }
            );
            setTodos((prev) =>
                prev.map((todo) => {
                    if (todo._id === id) {
                        return { ...todo, completed: true };
                    }
                    return todo;
                })
            );
        } catch (error) {
            navigate("/error", {
                state: {
                    error: error.response ? error.response.data : error.message,
                },
            });
        }
    };

    dueDate = moment(dueDate).format("MMMM D, YYYY");

    return (
        <div className="relative p-4 mb-4 bg-slate-800 rounded-lg shadow-lg backdrop-blur-md mx-auto w-96 flex flex-col">
            <h2 className="text-2xl font-bold text-indigo-400 mb-2">{title}</h2>
            {note && <p className="text-gray-300 mb-2">{note}</p>}
            {tags.length > 0 && (
                <div className="text-gray-400 mb-2">
                    <strong className="text-gray-200">Tags:</strong> {tags.join(", ")}
                </div>
            )}
            {dueDate && (
                <div className="text-gray-400 mb-2">
                    <strong className="text-gray-200">Due Date:</strong> {dueDate}
                </div>
            )}
            {priority && (
                <div className="text-gray-400 mb-4">
                    <strong className="text-gray-200">Priority:</strong> {priority}
                </div>
            )}
            {!showCompleted ? (
                <button
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300 mx-auto"
                    onClick={handleClick}
                >
                    Mark as Completed
                </button>
            ) : null}
        </div>
    );
};

export default IncompleteTodo;