const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { 
      type: String, 
      required: true,
      unique: true,
      trim: true
    },
  password: { 
      type: String, 
      required: true 
    },
  city: { 
      type: String
  },
  state: {
      type: String
  },
  pastLocations: { 
      type: Array, 
    },
  date: {
    type: Date,
    default: Date.now
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