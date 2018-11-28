import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import Page from './page';
import Test from './test';
import Goods from './goods';

class Home extends Component {
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		console.log(this.props, this.props.children)
	}

	render() {
		let {match} = this.props;
		return (
			<div>
				<Route exact path={`${match.url}`} component={Page} />
				<Route exact path={`${match.url}/page`} component={Page} />
				<Route exact path={`${match.url}/test`} component={Test} />
				<Route exact path={`${match.url}/redis`} render={() => (
					<Redirect to="/goods"/>
				)}/>
				<Route path={`${match.url}/goods`} component={Goods} />
			</div> 
		)
	}
}

export default Home;

