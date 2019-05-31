import { actionTypes } from './actions';

const INITIAL_STATE = {
  username: '',
  redirect: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN_REQUEST:
      return  {
        ...state,
        username: action.payload,
        // redirect: true
      };
    default:
      return state;
  }
}
