let path = require('path');
let webpack = require('webpack');
let merge = require('webpack-merge');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let ImageminPlugin = require('imagemin-webpack-plugin').default;
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
let base = require('./base');
let config = require('./config/config');
let util = require('./config/util');

let NODE_ENV = process.env.NODE_ENV || 'production';

function getHtml(name) { 
	let htmlName = name.replace(/\.js/, '.html');

	return new HtmlWebpackPlugin({
		filename: `html/${htmlName}`,
		template: path.resolve(__dirname, `../src/html/${htmlName}`),
		inject: 'body',
		chunks: [name, 'vonder']
	}) 
} 
 
function getDistConfig(name) {
	let pack = name.split('.')[0];

	return merge(base, {
		devtool: 'source-map',

		mode: 'production',

		entry: util.getEntryByName(name), // Array | String | Object

		output: {
			path: path.resolve(config.production.output.path, pack),
			chunkFilename: 'js/[name].[chunkhash:5].js'
		},

		optimization: { 
			splitChunks: {
				chunks: 'initial',  // 只对入口文件中引用的node_modules模块分割
				cacheGroups: {
					vendor: {
						name: 'vandor',
			            test: /[\\/]node_modules[\\/]/,
			            priority: -10
			        }, 
				}
			},

			runtimeChunk: true
		},

		plugins: [
			new webpack.DefinePlugin({
				'NODE_ENV': JSON.stringify('production'),
				'COOKIE_SUFFIX': JSON.stringify('-pro'),
			}),

			new webpack.NoEmitOnErrorsPlugin(),

			new ImageminPlugin({ 
			    pngquant: {
			        quality: '95-100'
			    }
			}),

			// 缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
		    new OptimizeCSSPlugin({
		      	cssProcessorOptions: {
		        	safe: true
		      	}
		    }),

			getHtml(name),
		]

	});
}

module.exports = getDistConfig;
