const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/user/:userId", async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.send(user);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    req.session = null;
    res.redirect("/");
  });
};
