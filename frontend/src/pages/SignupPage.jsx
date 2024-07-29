import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validate = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = "Username is required";
    } else if (values.username.length < 6) {
        errors.username = "Username must be at least 6 characters long.";
    }

    if (!values.password) {
        errors.password = "Password is required.";
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long.";
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm password is required.";
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords must match.";
    }

    return errors;
};

function SignupPage() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
        validate,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const payload = {
                    username: values.username,
                    password: values.password,
                };

                const response = await axios.post(
                    "http://localhost:3000/api/user/register",
                    payload
                );
                navigate("/login");
                resetForm();
            } catch (error) {
                navigate("/error", {
                    state: {
                        error: error.response
                            ? error.response.data
                            : error.message,
                    },
                });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-gradient-to-t from-gray-700 to-slate-800 ">
            <h1 className="text-3xl font-bold text-white hover:shad">Signup</h1>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col space-y-4 w-1/3 mx-auto p-6 bg-gray-900 shadow-2xl rounded-lg hover:shadow-lg hover:shadow-teal-600"
            >
                <label htmlFor="username" className="text-white">
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    {...formik.getFieldProps("username")}
                    className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {formik.touched.username && formik.errors.username ? (
                    <div className="text-sm text-red-400">
                        {formik.errors.username}
                    </div>
                ) : null}

                <label htmlFor="password" className="text-white">
                    Password
                </label>
                <input
                    type="text"
                    name="password"
                    {...formik.getFieldProps("password")}
                    className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-sm text-red-400">
                        {formik.errors.password}
                    </div>
                ) : null}

                <label htmlFor="confirmPassword" className="text-white">
                    Confirm Password
                </label>
                <input
                    type="text"
                    name="confirmPassword"
                    {...formik.getFieldProps("confirmPassword")}
                    className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                    <div className="text-sm text-red-400">
                        {formik.errors.confirmPassword}
                    </div>
                ) : null}

                <button
                    type="submit"
                    className="bg-teal-500 text-white px-4 py-2 rounded-md mx-auto hover:bg-teal-600 transition outline-none"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignupPage;
