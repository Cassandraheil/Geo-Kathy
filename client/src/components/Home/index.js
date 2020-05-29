import React, { Component } from "react";

import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { Input, TextArea, FormBtn } from "../Form";
import "./style.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./style.css";
const Moment = require("moment");

class Home extends Component {
  state = {
    posts: [],
    body: "",
    author: "",
    location: "",
    coordinates: {
      lat: "",
      lon: ""
    },
    restaurants: [],
    weather: {
      min: "",
      max: ""
    },
    user: ""
  };

  onLogoutClick = event => {
    event.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    console.log("component did mount")
    this.loadPosts();
    this.getUser(); 
  }

  getUser = () => {
    console.log(this.props.auth.user.id)
    API.getUser(this.props.auth.user.id)
      .then(res => 
        this.setState({ user: res.data.username })  
      )
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  loadPosts = () => {
    API.locationLookUp()
      .then(res => {
        console.log("API locationlookup res", res)
        this.setState({ location: res.data.city + ", " + res.data.region_code })
        this.setState({ coordinates: { lat: res.data.latitude, lon: res.data.longitude } })
        this.setState({ restaurants: "" })
        API.getPosts(this.state.location)
          .then(res =>
            this.setState({ posts: res.data, body: "", author: "", vote: "" }),
          ).catch(err => console.log(err));
        API.getWeather(this.state.coordinates)
          .then(res => {
            console.log("loadWeather res return: ", res);
            this.setState({ weather: { min: res.data.minTemp.toFixed(0), max: res.data.maxTemp.toFixed(0) } })
            console.log("weather state: ", this.state.weather)
          })
        API.yelpCall(this.state.location)
          .then(res => {
            console.log("loadRestaurants res return: ", res);
            this.setState({ restaurants: res.data })
          })
      })
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    console.log("in handle form submit")
    if (this.state.body) {
      API.savePost({
        body: this.state.body,
        author: this.state.user,
        location: this.state.location
      })
        .then(res => this.loadPosts(), console.log("post was saved"))
        .catch(err => console.log(err));
    }
  };

  // locationClick = event => {
  //   event.preventDefault();
  //   this.loadRestaurants();
  // }

  // weatherClick = event => {
  //   event.preventDefault();
  //   console.log("coordinates in location click: ", this.state.coordinates)
  //   this.loadWeather();
  // }

  voteClick = (id) => {
    let hasVoted = false
    for (let i = 0; i < this.state.posts.length; i++) {
      const currentPost = this.state.posts[i];
      if (id === currentPost._id) {
        for (let j = 0; j < currentPost.vote.length; j++) {
          if (this.state.user === currentPost.vote[j]) {
            hasVoted = true
            return hasVoted;
          }
        }
      }
    }
    if (!hasVoted) {
      API.updatePost(id, this.state.user)
        .then(res => {
          console.log("voteclick res", res.data)
          this.loadPosts()
        })
    }
  }


  render() {
    // const { user } = this.props.auth
    return (
      <Container fluid>
       <Row>
        <div className="jumbotron mt-4 jcolor scrollbar scrollbar-primary">
          <div className="row" style={{height: '500px'}}>
            <div className="col-5 text-center">
              <img alt="Kathy" src="https://i.imgur.com/YRh15Mk.png" class="kathy"></img>
              <h2> Hello! Here's today's weather in {this.state.location}:</h2>
              <h4>Temp High: {this.state.weather.max} °F</h4>
              <h4>Temp Low: {this.state.weather.min} °F</h4>
              <h2>Check out some of my local restaurant recommendations on the right!</h2>
            </div>
            <div className="col-7">
          
              {this.state.restaurants.length ? (
                <List>
                  {this.state.restaurants.map((restaurant, index) => (
                    <ListItem key={"restaurant" + index}>
                      <div className="row">
                        <div className="col-6 text-center">
                          <h3>{restaurant.name}</h3>
                          <div>
                            <p>
                              Rating: {restaurant.rating}    |
                              Distance: {restaurant.distance.toFixed(2)} miles
                            </p>
                          </div>
                          <p>
                            {restaurant.address.address1} <br />
                            {restaurant.address.city}, {restaurant.address.state} {restaurant.address.zip}
                          </p>
                          <p>
                            Phone: {restaurant.phone}
                          </p>
                          <p>
                            {restaurant.name} is: {restaurant.isClosed ? "Closed" : "Open"}
                          </p>
                        </div>
                        <div className="col-6 px-0 rest-img">
                          <img src={restaurant.img} alt="Restaurant" className="rest-img2"></img>
                          {/* <br></br> */}
                          <div><a href={restaurant.url}>Check {restaurant.name} out on Yelp!</a></div>
                         
                        </div>  
                      </div>
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <h3>No Results to Display</h3>
                )}
                
            </div>
          </div>
        </div>
      </Row>


      <Row>
          <Col size="md-12">
            <div className="review"><h1>Let others know what you think. Leave a review below!</h1></div>
          </Col> 
          </Row>  

        <Row>
          <Col size="md-12">
            <form>
              <div className="card mt-4">
                <div className="card-header">
                  
                  <TextArea
                    value={this.state.body}
                    onChange={this.handleInputChange}
                    name="body"
                    placeholder="Body"
                  />

                  <FormBtn
                    disabled={!(this.state.body)}
                    onClick={this.handleFormSubmit}
                  >
                    Submit Post
              </FormBtn>
                </div>
              </div>
            </form>
          </Col> 
          </Row>  

         <Container>
          <Row>
           
          <Col size="md-12">
            <div className="card mt-4">
              <div className="card-header">
                {/* <button onClick={this.locationClick}>Location</button> */}
                {/* <button onClick={this.weatherClick}>Weather</button> */}
                <h2>Posts</h2> </div>
                {this.state.posts.length ? (
                  <List>
                    {this.state.posts.map(post => (
                      <ListItem key={post._id}>
                        <h4>{post.author}</h4>
                        <h3>{post.body}</h3>
                        <p>Location: {post.location} Date: {Moment(post.date).format('MMMM Do YYYY, h:mm a')}</p>
                        <p> Vote: {post.vote.length}
                          <h2> <i onClick={() => (this.voteClick(post._id))} id={post._id} class="fas fa-angle-double-up"> </i></h2>
                          
                        </p>

                      </ListItem>
                    ))}
                  </List>

                ) : (
                    <h3>No Results to Display</h3>
                  )}
              </div>    
          </Col>

       
        </Row>
 </Container>
      </Container>
    );
  }
}

// export default Home;
Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Home);
