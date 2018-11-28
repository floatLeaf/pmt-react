let path = require('path');
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let hotMiddleware = require('webpack-hot-middleware');
// let historyApiFallback = require('connect-history-api-fallback');
let dev = require('./dev');
let config = require('./config/config'); 
let compiler = webpack(dev);
let website = require('../website');
let devserverOptions = {
	contentBase: config.development.output.path,
	hot: true,
	hotOnly: true,
	inline: true,
	open: true,
	noInfo: true,
	index: website.include[0].replace(/\.js/, '.html'),
	publicPath: config.development.output.publicPath, 
	stats: {
		colors: true
	},
	historyApiFallback: {
	  	rewrites: [
		    { from: /^\/$/, to: '/html/admin.html' },
		    { from: /^\/admin/, to: '/html/admin.html' },
		    { from: /^\/app/, to: '/html/app.html' }
	  	]
	},
	proxy: {
	  	"/api": {
	  		target: "http://localhost:7000",
	  		pathRewrite: {"^/api" : ""}
	  	}
	},
	// proxy: [{
	// 	context: ['/api', '/admin'],
	// 	target: 'http://localhost:3000'
	// }]
}; 
let app = new WebpackDevServer(compiler, devserverOptions);
app.use(hotMiddleware(compiler));

app.use((req, res, next) => {
	if (req.url.indexOf('/dll') === 0) {
      console.log(`request: ${req.url}`)
      return res.sendFile(path.resolve(__dirname, '../src/dll/', path.parse(req.url).base))
    } 
    next();
})


app.listen(config.development.port, () => {
	console.log('Starting server on httt://localhost:' + config.development.port);
})

