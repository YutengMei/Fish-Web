const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commentBody: {
    type: String,
    require: true
  },
  spotId: {
    type: Schema.Types.ObjectId,
    ref: "Spot"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  imageUrl: {
    type: String
  },
  dateCommented: {
    type: Date
  }
});

mongoose.model("comments", commentSchema);
