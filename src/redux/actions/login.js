import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants';

const loginRequest = () => ({
  type: LOGIN_REQUEST
});

const loginSuccess = authUser => ({
  type: LOGIN_SUCCESS,
  authUser
});

const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error
});

export default function login(firebase, email, password) {
  return dispatch => {
    dispatch(loginRequest());

    firebase
      .doLogin(email, password)
      .then(authUser => {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        dispatch(loginSuccess(authUser));
      })
      .catch(error => {
        console.log(error);
        localStorage.removeItem('authUser');
        dispatch(loginFailure(error));
      });
  };
}
