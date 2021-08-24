const express = require("express");
const app = express();

app.use(express.json());

const songRouter = require("./routes/songs.route");
app.use("/songs/", songRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my homepage");
});

const song = {
  name: "testSongName",
  artist: "testArtist",
};
const loadSongsDB = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(song), 10);
  });
};

const loadSongsDbFailed = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Network Connection Error")), 3);
  });
};

const getSongById = async (req, res, next) => {
  const songId = req.params.id;
  console.log("In getSongById: " + req.params.id);
  try {
    const result = await loadSongsDB();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

app.get("/mockDb/song/:id", getSongById);

app.get("/mockDb/fail", async (req, res, next) => {
  try {
    const result = await loadSongsDbFailed();
  } catch (error) {
    next(error);
  }
});

//Default error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  console.log("App Router Error: " + err.statusCode + " " + err.message);
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
