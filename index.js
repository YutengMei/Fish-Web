const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ wat: "up" });
});

// Use heroku port or default localhost 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT);
