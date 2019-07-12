import React, { Fragment } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./login/Login";
import Register from "./register/Register";
import Authenticated from "./authenticated/Authenticated";
import { logout } from "../redux/actions";

const Pages = ({ authUser, logout }) => {
  return (
    <Fragment>
      <Link to="/login">Login</Link>
      &nbsp;
      <Link to="/register">Register</Link>
      {authUser ? <button onClick={logout}>Logout</button> : null}
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/auth" component={Authenticated} />
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = ({ session }) => ({
  authUser: session.authUser
});

const mapDispatchToProps = { logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pages);
