const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  body: { 
      type: String, 
      required: true 
    },
  author: { 
    //   type: Schema.Types.ObjectId, 
    //   ref: "User" 
    type: String
    },
  city: {
    //   type: Schema.Types.ObjectId, 
    //   ref: "User" 
    type: String
    },
  state: {
    type: String
  },
  date: { 
      type: Date, 
      default: Date.now
      // default: moment(Date.now).format('MMMM Do YYYY, h:mm a'),
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;


//when the query is made use the populate method to get user and location
    // will this be affected when/if the user's 'current location' changes???
    // https://stackoverflow.com/questions/18001478/referencing-another-schema-in-mongoose


// needed fields to save
// ID #
// Location (city)
    // Grabs user’s current location
// Body of post
// Author of post
    // Grabs user’s ID
// Anonymous - boolean
    // True - will display Anonymous on page as author of the post
    // False - will display user’s name
// Upvote/downvote count