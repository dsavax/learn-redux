import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider} from 'react-redux';
import store, { history } from './store';
import css from './styles/style.styl';
import App from './components/App';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';

import Raven from 'raven-js';
import { sentry_url, logException } from './data/config';

// Sentry
Raven.config(sentry_url, {
	tags: {
		git_commit: '72a2bf5ff',
		userLevel: 'editor'
	}
}).install();

// console.log(window.doesNotExist.firstErrorCatchTest); //Sentry debug
// console.log(store.doesNot.nope());

// logException(new Error('download failed'), {
// 	email: 'email@localmail.test'							                       // Sentry exceprtion
// });

// Raven.captureMessage('Something Happened');			// Sentry trigger
// Raven.showReportDialog();						                         // Sentry report dialog

const router = (
	<Provider store={store}>
		<Router history ={history}>
			<Route path="/" component={App}>
				<IndexRoute component={PhotoGrid}></IndexRoute>
				<Route path="/view/:postId" component={Single}></Route>
			</Route>
		</Router>
	</Provider>
)

render(router, document.getElementById('root'));
