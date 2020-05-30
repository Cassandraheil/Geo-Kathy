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
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Post.findOne({
       _id: req.params.id
      }).then(post => {
        console.log("this is post", post)
    db.Post
      .findOneAndUpdate({ _id: req.params.id }, {vote: [...post.vote, req.params.user]})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
      })
  }
};