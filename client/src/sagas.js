import { all } from 'redux-saga/effects';

import { signUpSagas } from './pages/signUpPage/saga';
import { signInSagas } from './pages/loginPage/saga';

export default function* rootSaga() {
  yield all([
    ...signUpSagas,
    ...signInSagas,
  ]);
}
