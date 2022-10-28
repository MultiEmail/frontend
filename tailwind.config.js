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
			light: 200,
			normal: 400,
			medium: 500,
			bold: 700,
			black: 900,
		},
		extend: {
			colors: {
				primary: "#5271FF",
				"light": {
					"white": {
						100: "#F9F7F7",
						200: "#DBE2EF"
					},
					"blue": {
						100: "#3F72AF",
						200: "#112D4E",
					},
				},
				"dark": {
					"blue": {
						100: "#BBE1FA",
						200: "#3282B8",
						300: "#0F4C75",
						400: "#1B262C",
					},
				},
				// <--- New Themes Color Palettes --->
				"patriot": {
					darkblue: "#16213E",
					blue: "#0F3460",
					purple: "#533483",
					red: "#E94560"
				},
				"aqua": {
					"teal": {
						100: "#E7F6F2",
						200: "#A5C9CA",
						300: "#395B64",
						400: "#2C3333"
					}
				},
				// Saints Row Reference
				"saints": {
					"purple": {
						100: "#372948",
						200: "#251B37",
					},
					pink: "#FFCACA",
					white: "#FFECEF"
				}
			},
		},
	},
	plugins: [],
};
