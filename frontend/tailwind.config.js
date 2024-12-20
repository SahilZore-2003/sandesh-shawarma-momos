/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			colors: {
				primary: '#6fcf97',
				secondary: '#d7d8df',
				primaryText: '#293154',
				secondaryText: '#1d1d1d',
				border: '#ccced1',
				inputPrimary: '#949494',
				inputSecondary: '#bfc1c3',
				background:"#f9f9f9"

			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}
