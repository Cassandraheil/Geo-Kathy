const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { 
      type: String, 
      required: true 
    },
  password: { 
      type: String, 
      required: true 
    },
  currentLocation: { 
      type: String,
    },
  pastLocations: { 
      type: Array, 
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;


// ID #
// Username
// Password
// Location On Sign In
    // This is updated each time that particular user signs in
// Past Locations
    // Array that contains all locations (only if location not already in array) that were logged each time a user signs in
