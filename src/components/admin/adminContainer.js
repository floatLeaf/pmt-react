import React, {Component, Suspense, lazy} from 'react';
import {BrowserRouter  as Router, Route, Link, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Login from './login';
let Home = lazy(() => import('./Home'));

class AdminContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	_userConfirmation(message, callback) { 
  		// const allowTransition = window.confirm(message)
	  	// callback && callback(allowTransition)

	  	callback && callback();
	}

	render() {
		return (
			<Router basename="/admin" getUserConfirmation={this._userConfirmation('那还好')} forceRefresh={false} keyLength={1}>
				<div style={{height: '100%'}}> 
			        <Route exact path="/login" component={Login} />

			        <Suspense fallback={<div>Loading...</div>}>
			        	<Route path="/home" component={Home} />
			        	<Route exact path="/" component={Home} />  
			        </Suspense>
			    </div> 
			</Router>
		)
	}
}

export default hot(module)(AdminContainer);