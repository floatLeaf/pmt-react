let fs = require('fs');
let path = require('path');
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let config = require('./config/config'); 
let styleLoaders = require('./config/styleLoaders');
let NODE_ENV = process.env.NODE_ENV || 'development'; 

module.exports = {
	mode: 'development', // production, development, none(默认) 

	output: {
		filename: 'js/[name].[hash].js',
		path: config[NODE_ENV].output.path, // f文件输出路径
		publicPath: config[NODE_ENV].output.publicPath,  // 处理静态资源引用的路径
	},

	module: {
		rules: [  			
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			}, 

			{
	        	test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        		loader: 'url-loader?limit=8192&context=client&name=img/[name].[hash:7].[ext]' 
			},

			...styleLoaders
		]
	},

	plugins: [ 
		new MiniCssExtractPlugin({ filename: "css/[name].[hash:6].css" }),
	],

	resolve: {  
        extensions: ['.js', '.jsx', 'json'],
        modules: [path.join(__dirname, '../node_modules')],
        alias: { 
            src: path.resolve(__dirname, '../src'),
            lib: path.resolve(__dirname, '../src/lib'),
            assets: path.resolve(__dirname, '../src/assets'),
            components: path.resolve(__dirname, '../src/components'), 
        } 
	}
};