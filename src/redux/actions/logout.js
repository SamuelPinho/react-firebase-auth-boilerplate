import { LOGOUT_SUCCESS } from "../constants";

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  authUser: null
});

export default function logout(firebase) {
  return dispatch => {
    firebase
      .doLogout()
      .then(() => {
        firebase.onAuthUserListener(authUser => {
          localStorage.removeItem("authUser");
          dispatch(logoutSuccess());
        });
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  };
}
