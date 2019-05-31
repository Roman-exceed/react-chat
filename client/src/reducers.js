import { combineReducers } from 'redux';

import userInfo from './pages/loginPage/reducer';
import signUpPage from './pages/signUpPage/reducer';

const reducers = {
  userInfo,
  signUpPage
};


export const reducer = combineReducers(reducers);
