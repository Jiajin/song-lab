const express = require("express");
const app = express();

app.use(express.json());

const songRouter = require("./routes/songs.route");
app.use("/songs/", songRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my homepage");
});

//Default error handler
app.use((err, req, res, next) => {
  console.log("App Router Error: " + err.statusCode);
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
