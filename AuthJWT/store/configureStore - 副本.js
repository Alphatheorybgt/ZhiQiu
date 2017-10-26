import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore, routerMiddleware, routerActions } from 'react-router-redux'
import reducers from '../reducers'
import { UserAuthWrapper } from 'redux-auth-wrapper'

export default function configureStore(){
	const baseHistory = browserHistory
	const routingMiddleware = routerMiddleware(baseHistory)
	const reducer = combineReducers(Object.assign({}, reducers, {
	  routing: routerReducer
	}))

	const DevTools = createDevTools(
	  <DockMonitor toggleVisibilityKey="ctrl-h"
	               changePositionKey="ctrl-q">
	    <LogMonitor theme="tomorrow" />
	  </DockMonitor>
	)

	const UserIsAuthenticated = UserAuthWrapper({
	  authSelector: state => state.user,
	  redirectAction: routerActions.replace,
	  wrapperDisplayName: 'UserIsAuthenticated'
	})


	const enhancer = compose(
	  applyMiddleware(routingMiddleware),
	  DevTools.instrument()
	)

	const store = createStore(reducer, enhancer)
	const history = syncHistoryWithStore(baseHistory, store)

	return {store,history,DevTools}
}

