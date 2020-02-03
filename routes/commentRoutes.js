const mongoose = require("mongoose");
const Comment = mongoose.model("comments");
const verifyLogin = require("../middlewares/verifyLogin");

module.exports = app => {
  app.get("/api/fishSpots/:spotId", async (req, res) => {
    const comments = await Comment.find({ spotId: req.params.spotId });
    res.send(comments);
  });

  app.post("/api/fishSpots/:spotId", async (req, res) => {
    const { commentBody, imageUrl } = req.body;

    const comment = await new Comment({
      commentBody: commentBody,
      spotId: req.params.spotId,
      author: req.user.id,
      imageUrl: imageUrl,
      dateCommented: Date.now()
    }).save();

    res.send(comment);
  });
};
