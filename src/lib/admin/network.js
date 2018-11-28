import axios from 'axios';

let prefix = '/api';

export default {
	get: () => {
		return axios.get({
			url: prefix + '',
			method: 'get',


		})
	}
}