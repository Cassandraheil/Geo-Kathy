const router = require("express").Router();
const userController = require("../../controllers/usersControllers");
const db = require("../../models");

router.route("/")
  .post(userController.create);


router.route("/info/:id")
  .post(userController.get);
// router.put("/:id")
//   .post(userController.update);


//router.put("/update", (req, res) => {
  // db.User.findOneandUpdate(userID)
  // check if location is already set
    // if no location set - set it
  // check if location has already been added to past locations array
    // if yes ignore
    // if no push new location to array
//})

// validation stuff
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");


router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput (req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  db.User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists"});
    } else {
      const newUser = new db.User({
        username: req.body.username,
        password: req.body.password,
        location: req.body.location
      });
      
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err,hash) => {
          if (err) throw err;
          
          newUser.password = hash;
        newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;
  const location = req.body.location;

  db.User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json({ usernamenotfound: "Username not found" });
    }
    
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          location: user.location
        };
        
        jwt.sign(
          payload,
          keys.secretOrKey,
            {
              expiresIn: 31556926
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
        );
      } else {
        return res.status(400).json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});


  
module.exports = router;