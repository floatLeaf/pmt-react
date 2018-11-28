let path = require('path');
let webpack = require('webpack');
let base = require('./base');
let webpackMerge = require('webpack-merge');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlWebpackStatic = require('./plugins/htmlWebpackStatic');
let website = require('../website');
let util = require('./config/util');

let entries = util.getEntry('include'); // Array | String | Object
let getHtml = () => { 
	return Object.keys(entries).map(key => {
		let entry = entries[key][0];
		let name = path.parse(entry).base.replace(/\.js/, '.html');
		entries[key].unshift('webpack-hot-middleware/client')// 添加热加载到入口文件中
		entries[key].unshift('@babel/polyfill');  

		return new HtmlWebpackPlugin({
			filename: `html/${name}`,
			template: path.resolve(__dirname, `../src/html/${name}`),
			inject: 'body',
			chunks: [key ]
		})
	}); 
} 

module.exports = webpackMerge(base, {
	devtool: 'cheap-source-map',

	entry: entries,

	plugins: [
		new webpack.DefinePlugin({
			'NODE_ENV': JSON.stringify('development'),
			'COOKIE_SUFFIX': JSON.stringify('—dev'),
		}),

		new webpack.DllReferencePlugin({
			context: path.resolve(__dirname, '../'),
			manifest: require('./dll/manifest.json'), 
		}),

		new webpack.NoEmitOnErrorsPlugin(), // 确保编译输出的代码不会包含错误

		new webpack.HotModuleReplacementPlugin(),

		...getHtml(),

		new HtmlWebpackStatic({
			js: ['/dll/lib.js']
		}),
	]
});

