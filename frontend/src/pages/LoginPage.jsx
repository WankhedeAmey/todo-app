import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const validate = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = "Username is required";
    }

    if (!values.password) {
        errors.password = "Password is required";
    }

    return errors;
};

function LoginPage() {
    const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validate,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            setIsLoading(true);
            try {
                const payload = {
                    username: values.username,
                    password: values.password,
                };
                const response = await axios.post(
                    "http://localhost:3000/api/user/login",
                    payload
                );
                localStorage.setItem("token", response.data.token);
                resetForm();
                setServerError("");
                navigate("/dashboard");
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    setServerError(error.response.data || "An error occurred");
                } else {
                    setServerError("An unexpected error occurred");
                }
            } finally {
                setSubmitting(false);
                setIsLoading(false);
            }
        },
    });

    const inputClassNames = (field) =>
        `bg-gray-700 text-white outline-none focus:border-teal-600 ${
            (formik.touched[field] && formik.errors[field]) || serverError
                ? "border-red-600 border-2"
                : "border-gray-600 border"
        } rounded-md p-2`;

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-t from-gray-700 to-slate-800 space-y-4">
            <h1 className="text-3xl font-bold text-white">Login</h1>
            <form
                className="flex flex-col space-y-4 w-1/3 mx-auto p-6 bg-gray-900 shadow-2xl rounded-lg hover:shadow-lg hover:shadow-teal-600"
                onSubmit={formik.handleSubmit}
            >
                <label htmlFor="username" className="text-white">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    {...formik.getFieldProps("username")}
                    className={inputClassNames("username")}
                />
                {formik.touched.username && formik.errors.username ? (
                    <div className="text-xs text-red-400">
                        {formik.errors.username}
                    </div>
                ) : null}

                <label htmlFor="password" className="text-white">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    {...formik.getFieldProps("password")}
                    className={inputClassNames("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-xs text-red-400">
                        {formik.errors.password}
                    </div>
                ) : null}

                {serverError && (
                    <div className="text-sm text-red-500">
                        Incorrect username or password
                    </div>
                )}
                <button
                    type="submit"
                    className="bg-teal-500 text-white font-semibold px-6 py-2 rounded-md mx-auto hover:bg-teal-600 transition"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
