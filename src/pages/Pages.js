import React, { Fragment, Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Login from './login/Login';
import Register from './register/Register';
import Authenticated from './authenticated/Authenticated';
import { logout, setUser } from '../redux/actions';
import { withFirebase } from '../services/Firebase';

class Pages extends Component {
  componentDidMount() {
    if (this.props.authUser === null) {
      this.props.firebase.onAuthUserListener(
        authUser => {
          this.props.setUser(authUser);
        },
        () => {
          this.props.setUser(null);
        }
      );
    }
  }

  render() {
    const { authUser, logout, firebase } = this.props;

    return (
      <Fragment>
        <Link to="/login">Login</Link>
        &nbsp;
        <Link to="/register">Register</Link>
        {authUser ? <button onClick={() => logout(firebase)}>Logout</button> : null}
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/auth" component={Authenticated} />
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  authUser: session.authUser
});

const mapDispatchToProps = { logout, setUser };

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Pages);
