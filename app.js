const express = require("express");
const app = express();

app.use(express.json());

const songRouter = require("./routes/songs.route");
app.use("/songs", songRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my homepage");
});

module.exports = app;
