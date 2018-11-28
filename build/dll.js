let path = require('path');
let webpack = require('webpack');
let base = require('./base'); 
module.exports = { 
	entry: {
		lib: [path.resolve(__dirname, './dll/config')],
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../src/dll'),
		library: '[name]_library', 
	},

	module: base.module,

	plugins: [
		new webpack.DllPlugin({
			name: '[name]_library',
			path: path.resolve(__dirname, './dll', 'manifest.json')
		}),
		...base.plugins
	],

	resolve: base.resolve,

	devtool: 'cheap-source-map',
}


/*
	library配置项写成了'[name]_library.js', 加了js后缀导致dll文件无法生成
	DllPlugin的path配置项， 要具体到生成文件的名称
 */