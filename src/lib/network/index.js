import axios from 'axios';
import { message } from 'antd';

let prefix = '/api';
let timeout = 30000;


function checkStatus(response) {
	console.log(response)
	if (response.status >= 200 && response.status < 300) {
   	 	return response.data;
  	} else { 
	    var error = new Error(response.status)
	    error.response = response
	    throw error;
	}
}
 

// 请求成功之后过滤code 不等于20000的情况
function errorFilter(res) {
	if (res.code == 20000) {
		return res.data;
	} else {
		throw new Error(res.message);
	}
}


function getQueryData(data) {
	let str = '';
	if (data instanceof Object) {
		for(let k in data) {
			if (!str) {
				str += `?${k}=${data[k]}`;
			} else {
				str += `&${k}=${data[k]}`;
			}
		}
	}
	return str;
}

function createAjax(type) {
	return (url = '', data = {}) => {
		url = prefix + url;
		if(type == 'get') url += getQueryData(data);

		return axios({
			method: type,
			url: url,
			data: data,
			headers: {
		        'Content-Type': 'application/json'
			},
			timeout: timeout,
		})
		.then(checkStatus)
		.then(errorFilter)
		.catch(err => {
			console.error(err)
			message.error(err.message);
		});
	}
}


export default {
	get: createAjax('get'),
	post: createAjax('post'),
	put: createAjax('put'),
	delete: createAjax('delete'),
}