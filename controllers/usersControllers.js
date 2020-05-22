const db = require("../models");

module.exports = {
    create: function(req, res) {
        db.User
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.User
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
    // update: function(req, res) {
    //     console.log("usersController req.params.id: ", req.params.id)
    //     console.log(req.params)
    //     db.User
    //       .findOneAndUpdate({ id: req.params.id })
    //       .then(dbModel => 
    //         // res.json(dbModel)
    //         console.log(dbModel)
    //         )
    //     //   .catch(err => res.status(422).json(err));
    // }
}