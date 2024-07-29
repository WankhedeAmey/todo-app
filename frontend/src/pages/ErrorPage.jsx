import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

const ErrorPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { error } = location.state || { error: "Unknown error occurred..." };
    const errorDivRef = useRef(null);

    useEffect(() => {
        const bodyContentMatch = error.match(
            /<body[^>]*>((.|[\n\r])*)<\/body>/im
        );
        const err = bodyContentMatch ? bodyContentMatch[1] : error;

        if (errorDivRef.current) {
            errorDivRef.current.innerHTML = err;
        }
    }, [error]);

    return (
        <div className="max-w-3xl p-4 bg-white rounded shadow-md mx-auto mt-20">
            <div className="text-lg font-semibold mb-2 text-red-500">Error</div>
            <div
                ref={errorDivRef}
                className="error-message max-w-full overflow-auto whitespace-pre-wrap bg-gray-100 p-2 rounded border "
            ></div>
            <button
                onClick={() => navigate(-1)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
                Go back
            </button>
        </div>
    );
};

export default ErrorPage;
