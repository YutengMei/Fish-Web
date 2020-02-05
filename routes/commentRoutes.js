const mongoose = require("mongoose");
const Comment = mongoose.model("comments");

const verifyLogin = require("../middlewares/verifyLogin");
const _ = require("lodash");

module.exports = app => {
  app.get("/api/fishSpots/:spotId", async (req, res) => {
    var id = mongoose.Types.ObjectId(req.params.spotId);

    const comments = await Comment.find({ spotId: id })
      .populate("author")
      .exec();

    res.send(comments);
  });

  app.post("/api/fishSpots/:spotId", async (req, res) => {
    const { commentBody, imageUrl } = req.body;
    console.log("add comment routes called");
    var id = mongoose.Types.ObjectId(req.params.spotId);
    const comment = await new Comment({
      commentBody: commentBody,
      spotId: id,
      author: req.user.id,
      imageUrl: imageUrl,
      dateCommented: Date.now()
    }).save();
    const cm2 = await Comment.populate(comment, "author");
    res.send(cm2);
  });
};
