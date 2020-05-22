const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Post
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Post
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByLocation: function(req, res) {
    db.Post
      .find({ location: req.params.location })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Post
      .create(req.body)
      // .populate('username')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Post.findOne({
       _id: req.params.id 
      }).then(post => {
    db.Post
      .findOneAndUpdate({ _id: req.params.id }, {vote: post.vote+1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
      })
  }
//   remove: function(req, res) {
//     db.Book
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
};


// check if id is already in vote array--front end

// call the update function if user id not already in there
//make a new route for deleting the user id from array to take back their upvote
//push user id to array or take away depending on if the id is already in array