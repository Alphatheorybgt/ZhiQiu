import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import *as reducer from './data';
// import * as reducer from './data';

const rootReducer = combineReducers({
	 auth,
	 ...reducer,
	 routing: routerReducer,
})

export default rootReducer;

