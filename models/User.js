const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  userName: String,
  profileImageUrl: String
});

mongoose.model("User", userSchema);
