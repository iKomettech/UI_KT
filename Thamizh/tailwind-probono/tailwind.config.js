const colors = require('tailwindcss/colors')

module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				'primary': colors.gray[900],
				'secondary': colors.white,
				'blood': colors.red[600],
				'banana': colors.amber[400],
				'violet': colors.purple[600],
				'green': colors.emerald[500],
			},
			fontFamily: {
				fheaing: "probonoheading",
				fsubheaing: "probonosubheading",
				fprobono:"probono",
				froboto:"roboto"
			},
			screens: {
				'mob':  {'min': '375px', 'max': '767px'},
			}
		}
	},
	plugins: [
		// require('@tailwindcss/typography')({
		// 	className: 'wysiwyg'
		// }),
		// require('@tailwindcss/forms')
	]
}
