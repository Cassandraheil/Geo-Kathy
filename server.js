const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const passport = require("passport");
const users = require("./routes/api/users");
const PORT = process.env.PORT || 3001;
require("dotenv").config()
// Define middleware here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);
app.use("/api/users", users);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/geo-test", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => console.log("MongoDB connected"));

app.use(passport.initialize());
require("./config/passport")(passport);

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});