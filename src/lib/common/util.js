function formatKey(key) {
	return `${key}-${COOKIE_SUFFIX}`;
}

export const setCookie = (name, val, exdays = 1, path = '/', domain = window.location.hostname) => {
	let expires = +new Date() + exdays * 24 * 60 * 60 * 1000;
	expires = new Date(expires).toUTCString();
	document.cookie = `${formatKey(name)}=${encodeURIComponent(JSON.stringify(val))}; path=${path}; expires=${expires}; domain=${domain}`;
}

export const getCookie = (name) => {
	let cookie = document.cookie;
	if (!cookie) return '';

	let cookArr = cookie.split(';'),
		len = cookArr.length;

	name = formatKey(name);
	for (let i = 0; i < len; i++) {
		let str = cookArr[i];
		let ind = str.indexOf(name);
		if (ind >= 0) { 
			ind += name.length + 1;  // '=' 
			return JSON.parse(decodeURIComponent(str.substr(ind)));
		}
	}

	return '';
}


export const getQueryByName = name => { 
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  	let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    	results = regex.exec(location.href);
  	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}