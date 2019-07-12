import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants';

const INITIAL_STATE = {
  authUser: null
};

function session(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        authUser: action.authUser
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        authUser: action.authUser
      };
    }
    default:
      return state;
  }
}

export default session;
