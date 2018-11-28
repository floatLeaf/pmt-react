import React, { Component } from 'react';  
import PropTypes from 'prop-types'; 
import Immutable from 'immutable';
import md5 from 'js-md5';
import { Icon, Button, message } from 'antd';
import network from 'src/lib/network';
import * as util from 'src/lib/common/util';
import './index.scss';

function FormItemError(props) {
	if (!props.condition) {
		return <div className="form-item-error"></div>;
	}

	return (
		<div className="form-item-error">{props.msg}</div>
	)
}


class AdminLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: 'admin',
			password: '123456', 
			errorMsg: {
				username: '请输入用户名',
				password: '请输入密码', 
			},
			focusState: {
				username: false,
				password: false, 
			},

			loading: false,		
		};

		this.form = React.createRef(); 

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		let name = e.target.name;
		let focusState = this.state.focusState;
		focusState[name] =  true;
		this.setState({[name]: e.target.value, focusState});
	}

	// 登陆前验证
	validateForm() {
		let status = true,
			name = '';
		if (!this.state.username) {
			status = false;
			name = 'username';
		}

		else if (!this.state.password) {
			status = false;
			name = 'password'; 
		} 

		let focusState = this.state.focusState;
		focusState[name] =  true;
		this.setState({focusState});

		return status;
	}

	// 登录
	async handleSubmit(e) {
		e.preventDefault();
		if (!this.validateForm()) return;

		this.setState({loading: true});
		let loginData = {
			username: this.state.username,
			password: md5(this.state.password), 
		}; 

		let json = await network.post('/admin/system/login', loginData);
		this.setState({loading: false});
		console.log(json)
		if (json) {
			util.setCookie('token', json.token, 1);
			console.log(util.getCookie('token'))
		} 
		
		// if (this.props.location.query.back) {
		// 	this.props.router.goBack();
		// } else {
		// 	this.props.router.push('/admin');
		// }
	}

	async getCookie() { 

		let json = await network.get('/admin/user/cookie', {token: util.getCookie('token')}); 
	
		if (json) {
			 
		} 
	}

	render() {
		return (
			<div className="admin-login-wrap">
				<h1><span>Dora</span>CMS</h1>

				<form method="POST" onSubmit={this.handleSubmit.bind(this)} ref={this.form}> 
					<div className="form-item">
						<Icon type="user" />
						<input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="请输入用户名" autoComplete="off" />
					</div>
					<FormItemError condition={!this.state.username && this.state.focusState.username} msg={this.state.errorMsg.username} />

					<div className="form-item">
						<Icon type="safety" />
						<input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="请输入密码" autoComplete="off" />
					</div>
					<FormItemError condition={!this.state.password && this.state.focusState.password} msg={this.state.errorMsg.password} /> 

					<Button type="primary" htmlType="button" onClick={this.handleSubmit.bind(this)} style={{width: '100%', height: '36px', marginTop: '40px'}}>登录</Button>
					<Button type="primary" htmlType="button" onClick={this.getCookie.bind(this)} style={{width: '100%', height: '36px', marginTop: '40px'}}>获取cookie</Button>
				</form>
			</div>
		)
	}
}


export default AdminLogin;