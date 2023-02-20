/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,ts}"],
	theme: {
		extend: {
			screens: {
				xs: {
					min: "300px",
					max: "374px",
				},
				sm: {
					min: "375px",
					max: "767px",
				},

				md: {
					min: "768px",
					max: "1023px",
				},
				lg: {
					min: "1024px",
					max: "1365px",
				},
				xl: { min: "1366px" },
				xxl: { min: "1920px" },
			},
			animation: {
				fadeInOut: "fadeIn .3s linear, fadeOut 1s linear 1s forwards",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0", transform: "translateX(50%)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				fadeOut: {
					"100%": { transform: "translateY(-75%)", opacity: "0" },
				},
			},
		},
	},
	plugins: [require("prettier-plugin-tailwindcss"), require("daisyui")],
};
