import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./style.css"

class Nav extends Component {
  state = {
    open: false,
    width: window.innerWidth
  };

  updateWidth = () => {
    const newState = { width: window.innerWidth };

    if (this.state.open && newState.width > 991) {
      newState.open = false;
    }

    this.setState(newState);
  };

  onLogoutClick = event => {
    console.log("word")
    event.preventDefault();
    this.props.logoutUser();
  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
        <Link className="navbar-brand" to="/">
          Geo Kathy
        </Link>
        <button
          onClick={this.toggleNav}
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`${this.state.open ? "" : "collapse "}navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                onClick={this.toggleNav}
                className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
                to="/"
              >
                About
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                onClick={this.toggleNav}
                className={window.location.pathname === "/login" ? "nav-link active" : "nav-link"}
                to="/login"
              >
                Login
              </Link>
            </li> */}
            
            <li className="nav-item">
              <Link
                onClick={this.toggleNav}
                className={window.location.pathname === "/resturants" ? "nav-link active" : "nav-link"}
                to="/restaurants"
              >
                Restaurants
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={this.toggleNav}
                className={window.location.pathname === "/nightlife" ? "nav-link active" : "nav-link"}
                to="/nightlife"
              >
                Nightlife
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={this.toggleNav}
                className={window.location.pathname === "/hotels" ? "nav-link active" : "nav-link"}
                to="/hotels"
              >
               Hotels
              </Link>
            </li>
              </ul>
              <button
                // style={{
                //   width: "150px",
                //   borderRadius: "3px",
                //   letterSpacing: "1.5px",
                //   marginTop: "1rem",
                //   marginLeft: "900px"
                // }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3 logout-btn"
              >
                Logout
            </button>

              </div>
        </nav>
    );
  }
}



Nav.propTypes = {
          logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
          auth: state.auth
});

export default connect(
  mapStateToProps,
        { logoutUser}
)(Nav);

// export default Nav;
// logout button
// //dropdown tab connecting to nightlife/ theme paged
