import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { Input, TextArea, FormBtn } from "../Form";
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
    }
  };

  componentDidMount() {
    console.log("component did mount")
    this.loadPosts();
    this.updateUser(); 
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
        this.setState({ coordinates: {lat: res.data.latitude, lon: res.data.longitude}})
        API.getPosts(this.state.location)
          .then(res =>
            this.setState({ posts: res.data, body: "", author: "" }),
          ).catch(err => console.log(err));
        })
      };

  updateUser = () => {
    // API.updateLocation(userId, location)    


  }

  loadWeather = () => {
    console.log(this.state.coordinates)
    API.getWeather(this.state.coordinates)
      .then(res => {
        console.log("loadWeather res return: ", res);
        this.setState({ weather: {min: res.data.minTemp, max: res.data.maxTemp} })
        console.log("weather state: ", this.state.weather)
      })
  }



  loadRestaurants = () => {
    console.log("API.yelpCall: ", this.state.location)
    API.yelpCall(this.state.location)
      .then(res => {
        console.log("loadRestaurants res return: ", res);
        this.setState({ restaurants: res.data })
      })
    console.log("restaurants state: ", this.state.restaurants)
  }

handleInputChange = event => {
  const { name, value } = event.target;
  this.setState({
    [name]: value
  });
  console.log("handleInputChange value: " + this.state.author)
  console.log(this.state.body)
};


handleFormSubmit = event => {
  event.preventDefault();
  console.log("in handle form submit")
  if (this.state.body && this.state.author) {
    API.savePost({
      body: this.state.body,
      author: this.state.author,
      location: this.state.location
    })
      .then(res => this.loadPosts(), console.log("post was saved"))
      .catch(err => console.log(err));
  }
};

locationClick = event => {
  event.preventDefault();
  this.loadRestaurants();
}

weatherClick = event => {
  event.preventDefault();
  console.log("coordinates in location click: ", this.state.coordinates)
  this.loadWeather();
}

render() {
  return (
    <Container fluid>
       <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
        <h4>Temp High: {this.state.weather.max}</h4>
        <h4>Temp Low: {this.state.weather.min}</h4>

      <Row>
        <Col size="md-12">
          {/* <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron> */}
          <form>
          <div className="card mt-4">
      <div className="card-header">
            <Input
              value={this.state.author}
              onChange={this.handleInputChange}
              name="author"
              placeholder="Author (required)"
            />
            <TextArea
              value={this.state.body}
              onChange={this.handleInputChange}
              name="body"
              placeholder="Body"
            />
         
            <FormBtn
              disabled={!(this.state.author && this.state.body)}
              onClick={this.handleFormSubmit}
            >
              Submit Post
              </FormBtn>
              </div>
              </div>
          </form>
        </Col>
        <Col size="md-12 sm-12">
          {/* <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron> */}
          <button onClick={this.locationClick}>Location</button>
          <button onClick={this.weatherClick}>Weather</button>
          <h2>Posts</h2>
          {this.state.posts.length ? (
            <List>
              {this.state.posts.map(post => (
                <ListItem key={post._id}>
                    <h3>{post.author}</h3>
                    <h4>Location: {post.location}</h4>
                    <p>Date: {Moment(post.date).format('MMMM Do YYYY, h:mm a')}</p>
                    <p>{post.body}</p>
                </ListItem>
              ))}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}
        </Col>
        <Col size="md-12">
          <h2>Kathy's Recommendations</h2>
        {this.state.restaurants.length ? (
          <List>
            {this.state.restaurants.map((restaurant, index)=> (
              <ListItem key={"restaurant" + index}>
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
                <img src={restaurant.img} alt="Restaurant" className="rest-img"></img>
                <a href={restaurant.url}>Check {restaurant.name} out on Yelp!</a>
                <p>
                   {restaurant.name} is: {restaurant.isClosed ? "Closed": "Open"}
                </p>
            
            </ListItem>
            ))}
          </List>
        ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>

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

// {this.state.restaurants.map((restaurant, index)=> (
//   <ListItem key={"restaurant" + index}>

// Address: {restaurant.address.address1}{restaurant.address.city}
//                    {restaurant.address.state}
//                    {restaurant.address.zip}


//                    {restaurant.name} is: {restaurant.isClosed ? "Closed": "Open"}\
                   
//                    <img src={restaurant.img} alt="resturant image"></img>
//                   <a href={restaurant.url}>this is a link to the yelp page</a>
                 
