import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import {Input, TextArea, FormBtn } from "../Form";
// import "./style.css";

class About extends Component {

    render() {
        return (
            <Container fluid>
                <h1>About Geo Kathy</h1>
                <h4>
                    One of the most stressful parts about traveling to a new place is making sure you experience all the best parts of that area. With Geo Kathy, you get a local's perspective and can explore your destination the way a local would. 
                </h4>
                <h4>
                    Kathy is currently working on bringing you reviews for the best events and nightlife in your area. Stay tuned!
                </h4>

                <div>
                    <h5>Register for an account today to get all the latest and greatest recommendations for your area!</h5> 
                        <Link to="/register">Register</Link>
                </div>
                <div>
                    <h5>Already have an account?</h5>
                        <Link to ="/login">Login</Link>
                </div>
                
            </Container>     
        )
    }


};

export default About;