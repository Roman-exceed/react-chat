import { put, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { actionTypes } from './actions';

function* fetchSignUp({ payload }) {
  // yield delay(3000);

  console.log('-------SAGA WORKS');
  console.log('--------payload', payload);
  const response = yield axios.post('http://localhost:5000/api/auth/register', payload).then((response) => response.data)
    .catch((error) => {
    console.log(error);
  });
  
  console.log('--------response', response);

  yield put({ type: actionTypes.SIGN_UP_REQUEST_SUCCESS });
}


export const signUpSagas = [
  takeLatest(actionTypes.SIGN_UP_REQUEST, fetchSignUp),
];
