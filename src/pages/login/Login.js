import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { login } from '../../redux/actions';
import { withFirebase } from '../../services/Firebase';
import { withRouter } from 'react-router-dom';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class Login extends Component {
  state = { ...INITIAL_STATE };

  componentWillReceiveProps() {
    this.props.history.push('/auth');
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    this.props.login(this.props.firebase, email, password);
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    return (
      <Fragment>
        <h1>Login User</h1>
        <form onSubmit={this.handleSubmit} method="post">
          <div>
            <label>Email</label>
            <input type="email" name="email" onChange={this.handleChange} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" onChange={this.handleChange} />
          </div>
          <button type="submit">Login</button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  authUser: session.authUser
});

const mapDispatchToProps = { login };

export default compose(
  withFirebase,
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Login);
