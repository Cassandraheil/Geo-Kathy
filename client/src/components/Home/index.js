import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
// import Jumbotron from "../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { Input, TextArea, FormBtn } from "../Form";

class Home extends Component {
  state = {
    posts: [],
    body: "",
    author: "",
    location: ""
  };

  componentDidMount() {
    console.log("component did mount function")
    this.loadPosts();
  }

  loadPosts = () => {
    API.getPosts()
      .then(res =>
        this.setState({ posts: res.data, body: "", author: "", location: "" }),
        console.log(this.state.posts)
        )
      .catch(err => console.log(err));
  };

//   deleteBook = id => {
//     API.deleteBook(id)
//       .then(res => this.loadBooks())
//       .catch(err => console.log(err));
//   };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("in handle form submit")
    if (this.state.location && this.state.author) {
      API.savePost({
        body: this.state.body,
        author: this.state.author,
        location: this.state.location
      })
        .then(res => this.loadPosts())
        .catch(err => console.log(err));
    }
  };

  locationClick = event => {
    event.preventDefault();
    API.locationLookUp()
      .then(res =>
        // console.log(res.data.city),
        this.setState({ location: res.data.city }),
        console.log(this.state.location))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            {/* <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron> */}
            <form>
              <Input
                value={this.state.location}
                onChange={this.handleInputChange}
                name="location"
                placeholder="Location"
              />
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
            </form>
          </Col>
          <Col size="md-6 sm-12">
            {/* <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron> */}
            <button onClick={this.locationClick}>Location</button>
            {this.state.posts.length ? (
              <List>
                {this.state.posts.map(post => (
                  <ListItem key={post._id}>
                    <Link to={"/posts/" + post._id}>
                      <strong>
                        {post.body} by {post.author}
                      </strong>
                      <p>Posted in: {post.location} on {post.date}</p>
                    </Link>
                    {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
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

export default Home;
