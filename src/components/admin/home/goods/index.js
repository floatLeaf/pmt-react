import React, {Component} from 'react';
import {Route, Link, NavLink} from 'react-router-dom';
import {Switch} from 'react-router';
import List from './list';
import Detail from './detail';

class Goods extends Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	render() {
		let {path, match} = this.props; 
		return ( 
			<div> 
				<NavLink to={`${match.url}/list`}>list</NavLink>
				<br />
				<NavLink to={`${match.url}/detail`}>detail</NavLink>
				
				<Route exact path={`${match.url}`} component={List} />
				<Route exact path={`${match.url}/list`} component={List} />
				<Route exact path={`${match.url}/detail`} component={Detail} />
			</div> 
		)
	}
}

export default Goods;