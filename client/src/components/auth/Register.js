import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import API from "../../utils/API"
import "./register.css"
import Jumbotron from "../Jumbotron";
import JumbotronHome from "../JumbotronHome";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password2: "",
      location: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/restaurants");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    API.locationLookUp()
    .then(res => 
      this.setState({ location: res.data.city + ", " + res.data.region_code })  
    )
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
      location: this.state.location
    };
    this.props.registerUser(newUser, this.props.history); 
    console.log(newUser)
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <Jumbotron/>
        <div className="row">
          <div className="col s8 offset-s2">
            {/* <Link to="/" className="btn-flat waves-effect">
              Back to
              home
            </Link> */}
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
              <div class="row">
              <div class="col-sm lablestyle">
              <label htmlFor="name">Username</label>
              </div>
              </div>
              <div class="row">
              <div class="col-sm">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  placeholder="username"
                  type="text"
                  className={classnames("", {
                    invalid: errors.username
                  })}
                />
                <span className="red-text">{errors.name}</span>
                </div>
                </div>
              </div>
             
              
              <div className="input-field col s12"> 
              <div class="row">
              <div class="col-sm lablestyle">
              <label htmlFor="password">Password</label>
</div></div>    <div class="row">
              <div class="col-sm">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error= {errors.password}
                  id="password"
                  type="password"
                  placeholder="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
              
                <span className="red-text">{errors.password}</span>
              </div>   </div>   </div>
              <div className="input-field col s12">
              <div class="row">
              <div class="col-sm lablestyle">
              <label htmlFor="password2">Confirm Password</label>
              </div></div>
              <div class="row">
              <div class="col-sm">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  placeholder="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
            
                <span className="red-text">{errors.password2}</span>
              </div>   </div>   </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
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
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));