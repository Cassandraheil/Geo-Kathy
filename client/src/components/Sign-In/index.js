import React, { Component } from "react";
import { Input, FormBtn } from "../Form";
import API from "../../utils/API";

class Login extends Component {
    state = {
      username: "",
      password: "",
      location: ""
    };

    // saveUser = event => {
    //     event.preventDefault();
    //     this.setState({ username: username, password: password}),
    //     console.log("Username: " + this.state.username + "Password: " + this.state.password + "Location: " + this.state.location);
    // }

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
            <form>
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
                    onClick={this.userSave}
                >
                    Login
                </FormBtn>
            </form>
        )
    }
}

export default Login;