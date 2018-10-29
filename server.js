const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Cors = require("cors");
const app = express();
const passport = require("passport");

const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
//mongo database connection
mongoose
  .connect(
    keys.MongoURI,
    { useNewUrlParser: true }
  )
  .then(res => console.log("connected"))
  .catch(err => console.log("cant connect to mongo"));

//Handle cors issues
app.use(Cors());
// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

//User bodyParser to get res parsed into res.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Route handling
app.use("/api/user", authRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/settings", settingsRoutes);

const Port = 5000 || process.env.PORT;
app.listen(Port, () => console.log(`listening on port ${Port}`));
