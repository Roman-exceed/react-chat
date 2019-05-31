export const actionTypes = {
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_REQUEST_SUCCESS: 'SIGN_UP_REQUEST_SUCCESS',
  SIGN_UP_REQUEST_FAIL: 'SIGN_UP_REQUEST_FAIL',
};

export const signUpAction = (payload) => {
  return {
    type: actionTypes.SIGN_UP_REQUEST,
    payload,
  };
};
