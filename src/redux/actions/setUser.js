import { LOGIN_SUCCESS } from '../constants';

const loginSuccess = authUser => ({
  type: LOGIN_SUCCESS,
  authUser
});

export default function setUser(authUser) {
  return dispatch => {
    if (authUser === null) localStorage.removeItem('authUser');
    else localStorage.setItem('authUser', JSON.stringify(authUser));

    dispatch(loginSuccess(authUser));
  };
}
