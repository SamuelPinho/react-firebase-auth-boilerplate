import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../constants";

const INITIAL_STATE = {
  isFetching: false
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isFetching: true };
    case LOGIN_SUCCESS:
      return { ...state, isFetching: false };
    case LOGIN_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
};

export default login;
