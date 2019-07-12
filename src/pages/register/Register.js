import React, { Component, Fragment } from "react";

const INITIAL_STATE = {
  email: "",
  username: "",
  password: "",
  error: null
};

class Register extends Component {
  state = { ...INITIAL_STATE };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
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
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </Fragment>
    );
  }
}

export default Register;
