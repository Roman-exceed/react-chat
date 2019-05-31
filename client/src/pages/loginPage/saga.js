import { put, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { actionTypes } from './actions';

function* fetchSignIn({ payload }) {
  try {
    console.log('-------SAGA WORKS');
    console.log('--------payload', payload);
    const response = yield axios.post('http://localhost:5000/api/auth/login', payload);
    
    console.log('--------response', response);
  } catch (error) {
    
    console.log('--------error', error);
    console.log('--------error', error.response);
  }
}

export const signInSagas = [
  takeLatest(actionTypes.SIGN_IN_REQUEST, fetchSignIn),
];
