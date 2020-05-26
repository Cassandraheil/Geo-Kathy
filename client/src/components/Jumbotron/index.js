import React from "react";
import "./style.css";

function Jumbotron() {
    return (<div className="jumbotron mt-4 jcolor">
        <div class="row">
            <div class="col-3">
                <img alt="Kathy" src="https://i.imgur.com/YRh15Mk.png" class="kathy"></img></div>
            <div class="col-9">
                <h4><strong>Geo Kathy</strong> is a social media platform designed to connect with your community.
                When you sign in, the app grabs your location and populates what you see based on your area.
                <br/>   <br/>
                You can view posts other people have made, vote on what you like, and Kathy even gives
       you recommendations of restaurants to checkout. <strong>Connect with Kathy today!</strong></h4>
            </div>

        </div>
    </div>
    );
}

export default Jumbotron;
