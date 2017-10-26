import {createReducer} from '../utils';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER,REG_USER_REQUEST,REG_USER_SUCCESS,REG_USER_FAILURE} from '../constants';
import { push } from 'react-router-redux';
import Immutable from 'immutable'
import jwtDecode from 'jwt-decode';

const initialState = {
    token: null,
    userName: null,
    userid: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default createReducer(initialState, {
    [LOGIN_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
    },
    [REG_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
    },
    [LOGIN_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'token': payload.token,
            'userName': jwtDecode(payload.token).username,
            'userid': jwtDecode(payload.token).userid,
            'statusText': 'You have been successfully logged in.'
        });

    },
    [REG_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'token': payload.token,
            'userName': jwtDecode(payload.token).username,
            'userid': jwtDecode(payload.token).userid,
            'statusText': 'You have been successfully registered.'
        });

    },
    [LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'userid': null,
            'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
        });
    },
    [REG_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'userid': null,
            'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
        });
    },
    [LOGOUT_USER]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'userid': null,
            'statusText': 'You have been successfully logged out.'
        });
    }
});
