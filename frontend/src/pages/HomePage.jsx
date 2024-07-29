import { useNavigate } from "react-router-dom";

function HomePage() {
    return (
        <div className="flex flex-row min-h-screen items-center justify-center space-x-10 bg-gradient-to-t from-gray-700 to-slate-800">
            <LoginCard />
            <SignupCard />
        </div>
    );
}

const LoginCard = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-800 shadow-2xl px-8 py-5 w-72 h-52 flex flex-col justify-center items-start space-y-5 rounded-lg hover:shadow-xl hover:shadow-green-500">
            <div className="text-white text-lg font-semibold ">
                <span className="text-green-500 text-xl">Already a User?</span>{" "}
                <div className="text-sm">Log In to go to the dashboard.</div>
            </div>
            <button
                className="font-semibold text-lg bg-green-500 text-white px-4 py-2 rounded-md mx-auto hover:bg-green-600 transition "
                onClick={() => navigate("/login")}
            >
                User Login
            </button>
        </div>
    );
};

const SignupCard = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-800 shadow-2xl px-8 py-5 w-72 h-52 flex flex-col justify-center items-start space-y-5 rounded-lg hover:shadow-xl hover:shadow-red-500 ">
            <div className="text-white text-lg font-semibold">
                <span className="text-red-500 text-xl">New User?</span>{" "}
                <div className="text-sm">Sign Up to get started!</div>
            </div>
            <button
                className="font-semibold text-lg bg-red-500 text-white px-4 py-2 rounded-md mx-auto hover:bg-red-600 transition"
                onClick={() => navigate("/signup")}
            >
                User Signup
            </button>
        </div>
    );
};

export default HomePage;
