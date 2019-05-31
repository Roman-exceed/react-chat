import { actionTypes } from './actions';

const INITIAL_STATE = {
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.SIGN_UP_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
