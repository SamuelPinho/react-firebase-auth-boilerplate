import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem("authUser", JSON.stringify(authUser));
          this.props.onSetAuthUser(authUser);
        },
        () => {
          localStorage.removeItem("authUser");
          this.props.onSetAuthUser(null);
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser =>
      dispatch({
        type: "SET_AUTH_USER",
        authUser
      })
  });

  return compose(
    withFirebase,
    connect(
      null,
      mapDispatchToProps
    )
  )(WithAuthentication);
};

export default withAuthentication;
