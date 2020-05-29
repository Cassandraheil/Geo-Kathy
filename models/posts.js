const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  body: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String
  },
  location: {
    type: String
  },
  date: { 
    type: Date, 
    default: Date.now
  },
  vote: {
    type: Array
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;