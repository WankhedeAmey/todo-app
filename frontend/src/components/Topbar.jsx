import { useNavigate } from "react-router-dom";
import { userTitleAtom } from "../store/atoms/todoAtom";
import { useRecoilState } from "recoil";
const Topbar = () => {
    const navigate = useNavigate();
    const [userTitle, setUserTitle] = useRecoilState(userTitleAtom);
    const handleClick = () => {
        setUserTitle("");
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <div className="flex flex-row justify-around bg-slate-800 items-center py-4">
            <div className="font-bold text-3xl tracking-wide text-gray-200">
                Todo 📋
            </div>
            <div className="text-white font-honk text-6xl">
                Welcome {userTitle}
            </div>
            <button
                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 focus:bg-blue-800"
                onClick={handleClick}
            >
                Logout
            </button>
            
        </div>
    );
};

export default Topbar;
