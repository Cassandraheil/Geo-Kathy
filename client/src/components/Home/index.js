import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import {Input, TextArea, FormBtn } from "../Form";
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
    console.log("the user", this.state.author)
    this.props.logoutUser();
  };

  componentDidMount() {
    console.log("component did mount")
    this.loadPosts();
    // this.loadRestaurants();
    // this.getUser(); 
  }

  // getUser = () => {
  //   API.getUser(this.props.auth.user.id)
  //     .then(res => 
  //       this.setState({ author: res.data.username })  
  //     )
  // }

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
        this.setState({ restaurants: "" })
        API.getPosts(this.state.location)
          .then(res =>
            this.setState({ posts: res.data, body: "", author: "", vote: "" }),
          ).catch(err => console.log(err));
        API.getWeather(this.state.coordinates)
          .then(res => {
            console.log("loadWeather res return: ", res);
            this.setState({ weather: {min: res.data.minTemp, max: res.data.maxTemp} })
            console.log("weather state: ", this.state.weather)
          })
        API.yelpCall(this.state.location)
          .then(res => {
            console.log("loadRestaurants res return: ", res);
            this.setState({ restaurants: res.data })
          })
      })
  };

  // loadWeather = () => {
  //   console.log(this.state.coordinates)
  //   API.getWeather(this.state.coordinates)
  //     .then(res => {
  //       console.log("loadWeather res return: ", res);
  //       this.setState({ weather: {min: res.data.minTemp, max: res.data.maxTemp} })
  //       console.log("weather state: ", this.state.weather)
  //     })
  // }



  // loadRestaurants = () => {
  //   console.log("API.yelpCall: ", this.state.location)
  //   API.yelpCall(this.state.location)
  //     .then(res => {
  //       console.log("loadRestaurants res return: ", res);
  //       this.setState({ restaurants: res.data })
  //     })
  //   console.log("restaurants state: ", this.state.restaurants)
  // }

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
      author: this.state.author,
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
  // for (var j=0; j<this.state.post[j].length; j++){}  ---remember to wrap around everything
  // if (id === this.state.post[j]){}     ---remember to wrap around everything
  // for (var i=0; i<this.state.post[j].vote[i].length; i++){}     ---remember to wrap around everything
  // if (username--what is passed in voteclick-- === this.state.post[j].vote[i]){
  //   console.log("already voted")
  // }
  console.log("user", this.state.user)
  API.updatePost(id)
  .then(res => {
    console.log("voteclick res", res.data)
    this.loadPosts()
  }
 )
}


render() {
  // const { user } = this.props.auth
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
              disabled={!(this.state.body)}
              onClick={this.handleFormSubmit}
            >
              Submit Post
              </FormBtn>
              </div>
              </div>
          </form>
        </Col>
        <Col size="md-12 sm-12">
          {/* <button onClick={this.locationClick}>Location</button> */}
          {/* <button onClick={this.weatherClick}>Weather</button> */}
          <h2>Posts</h2>
          {this.state.posts.length ? (
            <List>
              {this.state.posts.map(post => (
                <ListItem key={post._id}>
                    <h4>{post.author}</h4>
                    <h3>{post.body}</h3>
                    <p>Location: {post.location} Date: {Moment(post.date).format('MMMM Do YYYY, h:mm a')}</p>
                    <p> Vote: {post.vote} 
             <h2> <i onClick={()=>(this.voteClick(post._id))} id={post._id} class="fas fa-angle-double-up"> </i></h2>
              {/* <i onClick={this.voteClick} id={post._id} class="fas fa-angle-double-down"> </i> */}
              </p>

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
// export default connect(
//   mapStateToProps,
//   { logoutUser }
// )(Home);
               
