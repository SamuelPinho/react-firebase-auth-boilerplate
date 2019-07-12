import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { login } from "../../redux/actions";
import { withFirebase } from "../../services/Firebase";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class Login extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.listener = this.props.firebase.onAuthUserListener(
      authUser => {
        console.log(authUser);
        localStorage.setItem("authUser", JSON.stringify(authUser));
        this.props.onSetAuthUser(authUser);
      },
      () => {
        localStorage.removeItem("authUser");
        this.props.onSetAuthUser(null);
      }
    );
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
    this.props.history.push("/auth");
  };

  render() {
    return (
      <Fragment>
        <h1>Login User</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email</label>
            <input type="email" name="email" onChange={this.handleChange} />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
            />
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Login);
