export const actionTypes = {
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST'
};

export const enterUsername = (payload) => {
  return {
    type: actionTypes.SIGN_IN_REQUEST,
    payload,
  };
};
