import CreateTodoForm from "../components/CreateTodoForm";
import { useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import IncompleteTodo from "../components/IncompleteTodo";
import {
    showCompletedAtom,
    todoListAtomGlobal,
    TodoListMain,
    todoSubmittedAtom,
    userTitleAtom,
} from "../store/atoms/todoAtom";
import { useEffect } from "react";
import axios from "axios";
import Filter from "../components/Filter";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Divider from "./Divider";

function DashboardPage() {
    const navigate = useNavigate();
    const setTodoList = useSetRecoilState(todoListAtomGlobal);
    const todoSubmitted = useRecoilValue(todoSubmittedAtom);
    const showCompletd = useRecoilValue(showCompletedAtom);
    const mainList = useRecoilValue(TodoListMain);
    const setUserTitle = useSetRecoilState(userTitleAtom);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "http://localhost:3000/api/todos",
                    {
                        headers: {
                            Authorization: `bearer ${token}`,
                        },
                    }
                );
                setUserTitle(response.data.username);
                setTodoList(response.data.todos);
            } catch (error) {
                navigate("/error", {
                    state: {
                        error: error.response
                            ? error.response.data
                            : error.message,
                    },
                });
            }
        };
        fetchData();
    }, [todoSubmitted]);
    return (
        <div className="bg-gradient-to-r from-slate-700 via-slate-400 to-slate-700 flex flex-col space-y-10">
            <Topbar></Topbar>
            <CreateTodoForm></CreateTodoForm>
            <Filter></Filter>

            <Divider></Divider>

            <div className="flex flex-col space-y-4">
                {!showCompletd
                    ? mainList.map((todo) => {
                          return (
                              <IncompleteTodo
                                  key={todo._id}
                                  id={todo._id}
                                  title={todo.title}
                                  note={todo.note}
                                  dueDate={todo.dueDate}
                                  priority={todo.priority}
                                  tags={todo.tags}
                              ></IncompleteTodo>
                          );
                      })
                    : null}
            </div>

            <div className="flex flex-col space-y-4">
                {showCompletd
                    ? mainList.map((todo) => {
                          return (
                              <IncompleteTodo
                                  key={todo._id}
                                  id={todo._id}
                                  title={todo.title}
                                  note={todo.note}
                                  dueDate={todo.dueDate}
                                  priority={todo.priority}
                                  tags={todo.tags}
                              ></IncompleteTodo>
                          );
                      })
                    : null}
            </div>
        </div>
    );
}

export default DashboardPage;
