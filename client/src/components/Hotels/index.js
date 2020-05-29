import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { TextArea, FormBtn } from "../Form";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./style.css";

const Moment = require("moment");

class Hotels extends Component {
  state = {
    posts: [],
    body: "",
    author: "",
    location: "",
    coordinates: {
      lat: "",
      lon: ""
    },
    hotels: [],
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
        this.setState({ coordinates: {lat: res.data.latitude, lon: res.data.longitude}})
        this.setState({ hotels: "" })
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
        API.hotelCall(this.state.location)
          .then(res => {
            console.log("in API hotel call on index")
            console.log("loadHotels res return: ", res);
            this.setState({ hotels: res.data })
          })
  })};

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    this.getUser();
    console.log("in handle form submit")
    if (this.state.body) {
      API.savePost({
        body: this.state.body,
        author: this.state.user,
        location: this.state.location,
      })
        .then(res => this.loadPosts(), console.log("post was saved"))
        .catch(err => console.log(err));
    }
  };


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
         
          <div className="jumbotron mt-4 jcolor scrollbar scrollbar-primary">
            <div class="row" style={{height: '500px'}}>
              <div class="col-3">
                <img alt="Kathy" src="https://i.imgur.com/YRh15Mk.png" class="kathy"></img></div>
              <div class="col-9">
                <h1> Hello! Here's today's weather in your city:</h1>
                <h4>Temp High: {this.state.weather.max}</h4>
                <h4>Temp Low: {this.state.weather.min}</h4>
  
           
            
                <h1> Here are my recommendations for you based on your location:</h1>
            
            
                {this.state.hotels.length ? (
                  <List>
                    {this.state.hotels.map((hotel, index) => (
                      <ListItem key={"hotel" + index}>
                        <h3>{hotel.name}</h3>
                        <div>
                          <p>
                            Rating: {hotel.rating}    |
                      Distance: {hotel.distance.toFixed(2)} miles
                    </p>
                        </div>
                        <p>
                          {hotel.address.address1} <br />
                          {hotel.address.city}, {hotel.address.state} {hotel.address.zip}
                        </p>
                        <p>
                          Phone: {hotel.phone}
                        </p>
                        <img src={hotel.img} alt="Hotel" className="rest-img"></img><br></br>
                        <a href={hotel.url}>Check {hotel.name} out on Yelp!</a>
                        {/* <p>
                          {hotel.name} is: {restaurant.isClosed ? "Closed" : "Open"}
                        </p> */}
  
                      </ListItem>
                    ))}
                  </List>
                ) : (
                    <h3>No Results to Display</h3>
                  )}
                  
              </div>
            </div>
          </div>
  
  
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
  Hotels.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Hotels);
  





//     return (
//       <Container fluid>
//         <button
//           style={{
//             width: "150px",
//             borderRadius: "3px",
//             letterSpacing: "1.5px",
//             marginTop: "1rem"
//           }}
//           onClick={this.onLogoutClick}
//           className="btn btn-large waves-effect waves-light hoverable blue accent-3"
//         >
//           Logout
//         </button>
//           <h4>Temp High: {this.state.weather.max}</h4>
//           <h4>Temp Low: {this.state.weather.min}</h4>
  
//         <Row>
//           <Col size="md-12">
//             <form>
//             <div className="card mt-4">
//         <div className="card-header">
//               {/* <Input
//                 value={this.state.author}
//                 onChange={this.handleInputChange}
//                 name="author"
//                 placeholder={this.state.user}
//               /> */}
//               <TextArea
//                 value={this.state.body}
//                 onChange={this.handleInputChange}
//                 name="body"
//                 placeholder="Body"
//               />
           
//               <FormBtn
//                 disabled={!(this.state.body)}
//                 onClick={this.handleFormSubmit}
//               >
//                 Submit Post
//                 </FormBtn>
//                 </div>
//                 </div>
//             </form>
//           </Col>
//           <Col size="md-12 sm-12">
//             {/* <button onClick={this.locationClick}>Location</button> */}
//             {/* <button onClick={this.weatherClick}>Weather</button> */}
//             <h2>Posts</h2>
//             {this.state.posts.length ? (
//               <List>
//                 {this.state.posts.map(post => (
//                   <ListItem key={post._id}>
//                       <h4>{post.author}</h4>
//                       <h3>{post.body}</h3>
//                       <p>Location: {post.location} Date: {Moment(post.date).format('MMMM Do YYYY, h:mm a')}</p>
//                       <p> Vote: {post.vote} 
//                <h2> <i onClick={()=>(this.voteClick(post._id))} id={post._id} class="fas fa-angle-double-up"> </i></h2>
//                 {/* <i onClick={this.voteClick} id={post._id} class="fas fa-angle-double-down"> </i> */}
//                 </p>
  
//                   </ListItem>
//                 ))}
//               </List>
//             ) : (
//                 <h3>No Results to Display</h3>
//               )}
//           </Col>
//           <Col size="md-12">
//             <h2>Kathy's Recommendations</h2>
//           {this.state.hotels.length ? (
//             <List>
//               {this.state.hotels.map((hotel, index)=> (
//                 <ListItem key={"hotel" + index}>
//                   <h3>{hotel.name}</h3>
//                   <div>
//                     <p>
//                       Rating: {hotel.rating}    |     
//                       Distance: {hotel.distance.toFixed(2)} miles
//                     </p>
//                   </div>
//                   <p>
//                      {hotel.address.address1} <br />
//                      {hotel.address.city}, {hotel.address.state} {hotel.address.zip}
//                   </p>
//                   <p>
//                      Phone: {hotel.phone}
//                   </p>
//                   <img src={hotel.img} alt="hotel" className="rest-img"></img>
//                   <a href={hotel.url}>Check {hotel.name} out on Yelp!</a>
//                   {/* <p>
//                      {hotel.name} is: {hotel.isClosed ? "Closed": "Open"}
//                   </p> */}
              
//               </ListItem>
//               ))}
//             </List>
//           ) : (
//               <h3>No Results to Display</h3>
//             )}
//           </Col>
//         </Row>
  
//       </Container>
//     );
//   }
//   }
  
//   // export default Home;
//   Hotels.propTypes = {
//     logoutUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
//   };
//   const mapStateToProps = state => ({
//     auth: state.auth
//   });
  
//   export default connect(
//     mapStateToProps,
//     { logoutUser }
//     )(Hotels);
               
