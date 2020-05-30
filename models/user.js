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
  location: {
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
