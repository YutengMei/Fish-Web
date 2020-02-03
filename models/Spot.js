const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotSchema = new Schema({
  latitude: {
    type: Number
  },
  longtitude: {
    type: Number
  },
  fishCatched: {
    type: Number
  },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: {
    type: Date
  }
});

mongoose.model("spots", spotSchema);
