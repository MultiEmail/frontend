/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,tsx, js, ts}"],
	theme: {
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
		},
		fontFamily: {
			sans: ["Inter var", "sans-serif"],
			serif: ["Georgia", "serif"],
			mono: ["Menlo", "Monaco", "Consolas", "monospace"],
			poppins: ["Poppins", "sans-serif"],
			roboto: ["Roboto", "sans-serif"],
		},
		fontWeights: {
			normal: 400,
			medium: 500,
			bold: 700,
			black: 900,
		},
		extend: {
			colors: {
				primary: "#5271FF",
			},
		},
	},
	plugins: [],
};
