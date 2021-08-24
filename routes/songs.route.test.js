const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());

const songRouter = require("./songs.route");
app.use("/songs", songRouter);

const song = {
  name: "testSongName",
  artist: "testArtist",
};

describe("POST /songs", () => {
  it("should respond with one song", async () => {
    const response = await request(app).post("/songs").send(song).expect(200);
    expect(response.body.name).toEqual("testSongName");
    expect(response.body.artist).toEqual("testArtist");
  });
});

const defaultSongs = [
  {
    name: "someSongName",
    artist: "someSongArtist",
  },
  {
    name: "anotherSongName",
    artist: "anotherArtist",
  },
];
describe("GET /songs", () => {
  it("should respond with the default songs", async () => {
    const response = await request(app).get(`/songs`).expect(200);
    expect(response.body[0]).toMatchObject(defaultSongs[0]);
  });
});

describe("GET /songs/:id", () => {
  it("should respond with the specified song", async () => {
    const response = await request(app).get(`/songs/${0}`).expect(200);
    console.log(response.body);
    // expect(response.body).toMatchObject(defaultSongs[0]);

    expect(response.body[0].name).toEqual("someSongName");
    expect(response.body[0].artist).toEqual("someSongArtist");
  });
});

describe("PUT /songs/:id", () => {
  it("should respond with the replaced song", async () => {
    const response = await request(app)
      .put(`/songs/${0}`)
      .send(song)
      .expect(200);
    expect(response.body.name).toEqual("testSongName");
    expect(response.body.artist).toEqual("testArtist");
  });
});
