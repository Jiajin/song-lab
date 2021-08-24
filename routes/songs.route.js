const express = require("express");
const router = express.Router();

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

router.get("/", (req, res) => {
  res.send(songs);
});

//Post new  song
router.post("/", (req, res) => {
  console.log(req.body.name + " " + req.body.artist);
  let newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist,
  };
  songs.push(newSong);

  res.send(newSong);
});

//Get /:id
router.get("/:id", (req, res) => {
  res.send(songs.filter((song) => song.id === parseInt(req.params.id)));
});

//Put /:id
router.put("/:id", (req, res) => {
  let songIndex = songs.findIndex((song) => song.id === req.params.id);
  let newSong = {
    id: req.params.id,
    name: req.body.name,
    artist: req.body.artist,
  };
  songs[songIndex] = newSong;
  res.send(newSong);
});

//Delete /:id
router.delete("/:id", (req, res) => {
  let songIndex = songs.findIndex((song) => song.id == req.params.id);
  let deleteSong = songs[songIndex];
  songs.splice(songIndex, 1);
  res.status(200).send(deleteSong);
});

module.exports = router;
