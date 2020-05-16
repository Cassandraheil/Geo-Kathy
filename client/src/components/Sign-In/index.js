import React, { Component } from "react";
import API from "../../utils/API";
import { FormBtn, Input } from "../Form"

class Login extends Component {
  state = {
    username: "",
    password: "",
    location: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  userSave = event => {
    event.preventDefault();
    API.locationLookUp()
      .then(res =>
        // console.log(res.data.city),
        this.setState({ location: res.data.city }),
        console.log("Username: " + this.state.username + "Password: " + this.state.password + "Location: " + this.state.location))
      .catch(err => console.log(err))
    API.saveUser({
      username: this.state.username,
      password: this.state.password,
      location: this.state.location
    })
      .then(res =>
        console.log("Username: " + this.state.username + "Password: " + this.state.password + "Location: " + this.state.location))
      .catch(err => console.log(err));
  }

render() {
  return (
    <div>
      <li><a href="/">home</a></li>
      <li><a href="/login">Login</a></li>
      <Input
        value={this.state.username}
        onChange={this.handleInputChange}
        name="username"
        placeholder="Username"
      >
      </Input>
      <Input
        value={this.state.password}
        onChange={this.handleInputChange}
        name="password"
        placeholder="Password"
      >
      </Input>
      <FormBtn
        disabled={!(this.state.username && this.state.password)}
        onClick={this.auth}
      >
        Login
                </FormBtn>
      <FormBtn
        disabled={!(this.state.username && this.state.password)}
        onClick={this.userSave}
      >
        register
                </FormBtn>

    </div>
  )
}
}

export default Login;