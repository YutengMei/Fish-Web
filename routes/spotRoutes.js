const mongoose = require("mongoose");
const Spot = mongoose.model("spots");
const verifyLogin = require("../middlewares/verifyLogin");

module.exports = app => {
  app.get("/api/fishSpots", async (req, res) => {
    const spots = await Spot.find({});
    res.send(spots);
  });

  app.post("/api/fishSpots", verifyLogin, async (req, res) => {
    const { latitude, longtitude } = req.body;
    const spot = await new Spot({
      latitude: latitude,
      longtitude: longtitude,
      fishCatched: 1,
      author: req.user.id,
      dateCreated: Date.now()
    }).save();
    res.send(spot);
  });

  app.put(
    "/api/fishSpots/addFishCatch/:spotId",
    verifyLogin,
    async (req, res) => {
      const spot = await Spot.findByIdAndUpdate(req.params.spotId, {
        $inc: { fishCatched: 1 },
        new: true
      });
      res.send(spot);
    }
  );
};
