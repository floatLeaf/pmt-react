let path = require('path');

module.exports = {
	rem: {
		disabled: true,
		rootValue: 25,
	},

	development: {
		output: {
			path: path.resolve(__dirname, '../../dist'),
			publicPath: '/',
		},

		port: 8001,
		sourceMap: true,
	},


	production: {
		sourceMap: false,
		output: {
			path: path.resolve(__dirname, '../../../pmt/dist'),
			publicPath: '/',
		},

	}
}