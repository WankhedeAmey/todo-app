/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                honk: ["Honk", "sans-serif"],
            },
            backdropBlur: {
                md: "8px",
            },
            colors: {
                "gray-800": "#2d2d2d",
                "gray-300": "#d1d5db",
                "gray-400": "#9ca3af",
            },
        },
    },
    plugins: [],
};
