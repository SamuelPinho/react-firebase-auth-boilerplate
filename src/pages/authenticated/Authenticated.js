import React, { Fragment } from "react";
import { withAuthorization } from "../../services/Session";
import { compose } from "recompose";
import { connect } from "react-redux";

const Authenticated = ({ authUser }) => {
  return (
    <Fragment>
      <h1>User {authUser.username} was logged with success!</h1>
    </Fragment>
  );
};

const mapStateToProps = ({ session }) => ({
  authUser: session.authUser
});

export default compose(
  connect(mapStateToProps),
  withAuthorization()
)(Authenticated);
