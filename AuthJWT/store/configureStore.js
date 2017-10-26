import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import React from 'react'
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import {applyMiddleware, createStore,compose} from 'redux';
import { createLogger } from 'redux-logger';
import { syncHistory } from 'react-router-redux'

export default function configureStore(){
	const baseHistory = browserHistory
	const routingMiddleware = routerMiddleware(baseHistory)

	const logger = createLogger();

	const middleware = applyMiddleware(routingMiddleware, thunk, logger);

	// const DevTools = createDevTools(
	//   <DockMonitor toggleVisibilityKey="ctrl-h"
	//                changePositionKey="ctrl-q">
	//     <LogMonitor theme="tomorrow" />
	//   </DockMonitor>
	// )
	// const enhancer = compose(
	//   middleware,
	//   DevTools.instrument()
	// )

	// Note: passing middleware as the last argument requires redux@>=3.1.0
	const store = createStore(
	  rootReducer,
	  middleware
	)

	const history = syncHistoryWithStore(baseHistory, store)

	// if (module.hot) {
	//   module.hot
	//   .accept('../reducers', () => {
	//     const nextRootReducer = require('../reducers/index');
	//     store.replaceReducer(nextRootReducer);
	//   });
	// }

	return {store,history}
}

