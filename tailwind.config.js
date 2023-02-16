/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,ts}"],
	theme: {
		extend: {
			screens: {
				sm: "375px",

				md: "960px",

				lg: "1440px",
			},
		},
	},
	plugins: [require("prettier-plugin-tailwindcss"), require("daisyui")],
};
