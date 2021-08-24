//Re-initialize new instance of app
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());

const songRouter = require("./songs.route");
app.use("/songs", songRouter);

//End re-initialization

const song = {
  name: "testSongName",
  artist: "testArtist",
};

describe.only("POST /songs", () => {
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

describe("DELETE /songs/:id", () => {
  it("should respond with the deleted song", async () => {
    const tobeDelSong = { name: "toBeDelSong", artist: "toBeDelArtist" };
    const addResponse = await request(app)
      .post("/songs")
      .send(tobeDelSong)
      .expect(200);
    // console.log(addResponse.body);

    const response = await request(app)
      .delete(`/songs/${addResponse.body.id}`)
      //.delete("/songs/3")
      .expect(200);
    console.log(response.body);
    expect(response.body).toMatchObject(tobeDelSong);
  });
});

describe("Error handling PUT", () => {
  it("should test for error in PUT /songs:id", async () => {
    const response = await request(app)
      .put(`/songs/100`)
      .send(song)
      .expect(400);
  });
});
