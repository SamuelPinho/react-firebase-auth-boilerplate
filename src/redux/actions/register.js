import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../constants';

const registerRequest = () => ({
  type: REGISTER_REQUEST
});

const registerSuccess = authUser => ({
  type: REGISTER_SUCCESS,
  authUser
});

const registerFailure = error => ({
  type: REGISTER_FAILURE,
  error
});

export default function register(firebase, email, username, password) {
  return dispatch => {
    dispatch(registerRequest());

    firebase
      .doRegister(email, username, password)
      .then(authUser => {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        dispatch(registerSuccess(authUser));
      })
      .catch(error => {
        console.log(error);
        localStorage.removeItem('authUser');
        dispatch(registerFailure(error));
      });
  };
}
