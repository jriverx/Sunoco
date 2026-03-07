/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./*.html",
        "./pages/**/*.html",
        "./js/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                sunocoBlue: "#264681",
                sunocoYellow: "#f6e150",
                sunocoRed: "#d34c49"
            },
            fontFamily: {
                heading: ["Barlow Condensed", "sans-serif"],
                body: ["Inter", "sans-serif"]
            },
            boxShadow: {
                card: "0 12px 30px rgba(38, 70, 129, 0.12)"
            }
        }
    },
    plugins: []
};
