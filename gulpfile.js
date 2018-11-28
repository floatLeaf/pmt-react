let path = require('path');
let webpack = require('webpack');
let gulp = require('gulp');
var clean = require('gulp-clean');
let config = require('./build/config/config');
let getDistConfig = require('./build/dist');
let dllconf = require('./build/dll.js');
let website = require('./website.json').build;

function getDistFile() {
	return website.map((file) => {
		let name = file.split('.')[0]; 
		return path.resolve(config.production.output.path, name);
	});
}

function getTestConfigMultiple() {
	return website.map((file) => {
		return getDistConfig(file);
	});

}
 
gulp.task('dll', function() {
	let complier = webpack(dllconf);
	complier.run((err, res) => {
		console.log(res.toString({colors: true}))
		if (!err) {
			console.log('success')
		} else {
			console.log(err)
		}
	});
});

gulp.task('clean', function() {
	return gulp.src(getDistFile())
			   .pipe(clean({read: false, force: true}));
});
 

gulp.task('build', ['clean'], function() {
	let complier = webpack(getTestConfigMultiple());
	complier.run((err, res) => {
		console.log(res.toString({colors: true}))
		if (!err) {
			console.log('success')
		} else {
			console.log(err)
		}
	});
});