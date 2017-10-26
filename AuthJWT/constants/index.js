import {createConstants} from '../utils';

export default createConstants(
 'LOGIN_USER_REQUEST',
 'LOGIN_USER_FAILURE',
 'LOGIN_USER_SUCCESS',
 'LOGOUT_USER',
 'REG_USER_REQUEST',
 'REG_USER_FAILURE',
 'REG_USER_SUCCESS',
 'FETCH_PROTECTED_DATA_REQUEST',
 'RECEIVE_PROTECTED_DATA'
);

export const LOGIN_USER_REQUEST ='LOGIN_USER_REQUEST'
export const LOGIN_USER_FAILURE ='LOGIN_USER_FAILURE'
export const LOGIN_USER_SUCCESS ='LOGIN_USER_SUCCESS'
export const LOGOUT_USER ='LOGOUT_USER'
export const FETCH_PROTECTED_DATA_REQUEST ='FETCH_PROTECTED_DATA_REQUEST'
export const RECEIVE_PROTECTED_DATA ='RECEIVE_PROTECTED_DATA'
export const REG_USER_REQUEST ='REG_USER_REQUEST'
export const REG_USER_FAILURE ='REG_USER_FAILURE'
export const REG_USER_SUCCESS ='REG_USER_SUCCESS'