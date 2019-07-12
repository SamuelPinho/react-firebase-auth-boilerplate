import { LOGOUT_SUCCESS } from '../constants';

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  authUser: null
});

export default function logout(firebase) {
  return dispatch => {
    firebase.doLogout();
    localStorage.removeItem('authUser');
    dispatch(logoutSuccess());
  };
}
