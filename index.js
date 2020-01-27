const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys.js");
//Since passport.js doesn't export anything, we can just call require(..)
// to run all the codes.
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);
const app = express();
//connecting to mongodb
/**
  Flow with OAuth with Passport:
  1. Incoming request from the browser
  2. app handles all incoming requests
  3. passport.initialize() will start up express for this request lifecycle
  4. passport.authenticate() will kick user into the oauth flow.
     When they are done, save info to their 'session' that indicates we know
     who they are.
**/

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// These two middlewares tell passport to use cookie to handle authentication.
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/authRoutes");
authRoutes(app);

// Use heroku port or default localhost 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT);
