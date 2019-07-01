import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';

import comments from './data/comments';
import posts from './data/posts';

// create an object for the default data
const defaultState = {
	posts,
	comments
};

const enhacers = compose(
	window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

const store = createStore(rootReducer, defaultState, enhacers);

export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {													                                                 // for hot reloading
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('./reducers/index').default;  // rerequire reducers,
																	  // recompile root reducer
																	  // commonJS syntax
		store.replaceReducer(nextRootReducer); 						                    // and swap it up!
	});
}

export default store;
