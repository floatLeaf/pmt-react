let fs = require('fs');
let path = require('path');
let website = require('../../website');

let _entries = null;

exports.getEntry = (name) => {
	let entries = {};
	website[name].forEach(web => {
		let pack = web.split('.')[0];
		let file = path.parse(path.resolve(__dirname, `../../src/components/${pack}/${web}`));
		entries[`${pack}/${file.name}`] = [path.resolve(file.dir, file.base)];
	});

	return entries;
}

/**
 * 根据入口文件名返回entry
 * @param  {[string]} name [如：admin.js]
 * @return {[type]}      [description]
 */
exports.getEntryByName = (name) => {
	let entries = {};
	let pack = name.split('.')[0]; 
	entries[pack] = ['@babel/polyfill', path.resolve(__dirname, `../../src/components/${pack}/${name}`)]
	return entries;
}
