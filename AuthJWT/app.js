import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore'
import routes from './routes';
import {loginUserSuccess} from './actions';
import { Router } from 'react-router';
import {Provider} from 'react-redux';

const target = document.getElementById('root');
// const {store, history} = configureStore(window.__INITIAL_STATE__)
const {store, history} = configureStore()

// const node = (
//     <Root store={store} history={history} />
// );

const node = (
    <div>
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    </div>
);

let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(loginUserSuccess(token));
}

ReactDOM.render(node, target);
