import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import API from "../../utils/API"
import Jumbotron from "../Jumbotron";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      location: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    API.locationLookUp()
      .then(res=> 
        this.setState({ location: res.data.city + ", " + res.data.region_code })  
      )
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password,
      location: this.state.location
    }; 

    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    console.log(userData)
  };

render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <Jumbotron/>
        <div className="row">
          <div className="col-10">
            {/* <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link> */}
            <div className="col-12">
              <h4>
                <b>Login</b> below to get started!
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s12">
              <div class="row">
              <div class="col-sm lablestyle">
            <label htmlFor="username">Username</label>
            </div>
              </div>
            <div className="input-field"> 
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="username"
                  className={classnames("", {
                    invalid: errors.username || errors.usernamenotfound
                  })}
                />
          
                <span className="red-text">
                  {errors.username}
                  {errors.usernamenotfound}
                </span>
              </div></div>

              <div className="input-field col s12"> 
              <div class="row">
              <div class="col-sm lablestyle">
              <label htmlFor="password">Password</label>
              </div></div>
              <div className="input-field">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
          
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div></div>
              <div className="input-field col s12"> 
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-outline-dark"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);