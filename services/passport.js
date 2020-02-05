// passport is general helpers for handling auth in Express apps
const passport = require("passport");
// Helpers for authenticating with one very specific method(email/password, Google, Facebook,etc)
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys.js");

const User = mongoose.model("User");

//user : user object just pull out from mongodb
//done: is callback, first argument: error object; second argument: identifier
// user.id is not the google id fetch from google server, but its a unique id
// from the mongodb database.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      //name: profile.name.givenName; profile.name.familyName
      //imageurl: profile.photos[0].value

      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //done function is called to tell passport that we have finished
        //creating a user and that it should resume the auth process
        done(null, existingUser);
      } else {
        const user = await new User({
          googleId: profile.id,
          userName: profile.name.givenName + " " + profile.name.familyName,
          profileImageUrl: profile.photos[0].value
        }).save();
        done(null, user);
      }
    }
  )
);
