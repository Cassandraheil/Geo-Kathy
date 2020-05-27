import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import {Input, TextArea, FormBtn } from "../Form";
import "./style.css";

class About extends Component {

    render() {
        return (
            <Container fluid>
                       <div className="jumbotron mt-4 jcolor">
          <div class="row">
            <div class="col-2">
              <img alt="Kathy" src="https://i.imgur.com/YRh15Mk.png" class="kathy"></img></div>
            <div class="col-9">
              <h1> <strong>Welcome to Geo Kathy</strong></h1>
        
              <h4>
                    One of the most stressful parts about traveling to a new place
                     is making sure you experience all the best parts of that area. With <strong>Geo Kathy</strong>,
                      you get a local's perspective and can explore your destination the way a local would. 
                </h4>
                <h4>
                    Kathy is currently working on bringing you reviews for the best 
                    events and nightlife in your area. Stay tuned!
                </h4><br/>
                <h4>Sign up for an account today to get all the latest and greatest recommendations for your area!</h4> 
                        <button className="btn btn-outline-dark"><a href="/register">Register</a></button><br/><br/>
                        <h4>Already have an account?</h4>
                       <button className="btn btn-outline-dark"> <Link to ="/login">Login</Link></button>
            </div>
       

               
                </div>
                </div>
            </Container>     
        )
    }


};

export default About;