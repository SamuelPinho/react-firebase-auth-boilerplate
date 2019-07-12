import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withAuthentication } from ".";

const withAuthorization = (condition = authUser => !!authUser) => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push("/login");
          }
        },
        () => {
          this.props.history.push("/login");
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return condition(this.props.authUser) ? (
        <Component {...this.props} />
      ) : null;
    }
  }

  const mapStateToProps = ({ session }) => ({
    authUser: session.authUser
  });

  return compose(
    withRouter,
    connect(mapStateToProps),
    withAuthentication
  )(WithAuthorization);
};

export default withAuthorization;
