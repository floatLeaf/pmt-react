import React from 'react';
import {render} from 'react-dom';
import 'assets/admin/style/base.scss';
import AdminContainer from './adminContainer';

render(
	<AdminContainer />,
	document.getElementById('app')
);
