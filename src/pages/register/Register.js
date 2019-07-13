import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withFirebase } from '../../services/Firebase';
import { register } from '../../redux/actions';

const INITIAL_STATE = {
  email: '',
  username: '',
  password: '',
  error: null
};

class Register extends Component {
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

    const { email, username, password } = this.state;

    this.props.register(this.props.firebase, email, username, password);
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    return (
      <Fragment>
        <h1>Register User</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email</label>
            <input type="email" name="email" onChange={this.handleChange} />
          </div>
          <div>
            <label>Username</label>
            <input type="text" name="username" onChange={this.handleChange} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" onChange={this.handleChange} />
          </div>
          <button type="submit">Register</button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  authUser: session.authUser
});

const mapDispatchToProps = { register };

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Register);
