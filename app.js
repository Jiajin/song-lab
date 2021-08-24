const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const songs = [
  {
    id: 0,
    name: "someSongName",
    artist: "someSongArtist",
  },
  {
    id: 1,
    name: "anotherSongName",
    artist: "anotherArtist",
  },
];
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/songs", (req, res) => {
  res.send(songs);
});

//Post new  song
app.post("/songs", (req, res) => {
  console.log(req.body.name + " " + req.body.artist);
  let newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist,
  };
  songs.push(newSong);

  res.send(newSong);
});

//Get song/:id
app.get("/songs/:id", (req, res) => {
  res.send(songs.filter((song) => song.id === parseInt(req.params.id)));
});

//Put /songs/:id
app.put("/songs/:id", (req, res) => {
  let songIndex = songs.findIndex((song) => song.id === req.params.id);
  let newSong = {
    id: req.params.id,
    name: req.body.name,
    artist: req.body.artist,
  };
  songs[songIndex] = newSong;
  res.send(newSong);
});

//Delete /songs/:id
app.delete("/songs/:id", (req, res) => {
  console.log(typeof req.params.id);
  let songIndex = songs.findIndex((song) => song.id === req.params.id);
  let deleteSong = songs[songIndex];
  songs.splice(songIndex, 1);
  res.status(200).send(deleteSong);
});

module.exports = app;
