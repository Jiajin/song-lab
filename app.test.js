const request = require("supertest");
const app = require("./app");

describe("App", () => {
  it("Testing to see if Jest works", () => {
    expect(1).toBe(1);
  });
});

describe("App", () => {
  it("GET / should respond with Welcome to my homepage", async () => {
    const response = await request(app).get("/").expect(200);
    expect(response.text).toEqual("Welcome to my homepage");
  });
});

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

// describe.only("DELETE /songs/:id", () => {
//   it("should respond with the deleted song", async () => {
//     const tobeDelSong = { name: "toBeDelSong", artist: "toBeDelArtist" };
//     const addResponse = await request(app)
//       .post("/songs")
//       .send(tobeDelSong)
//       .expect(200);
//     // console.log(addResponse.body);

//     const response = await request(app)
//       //.delete(`/songs/${addResponse.body.id}`)
//       .delete("/songs/2")
//       .expect(200);
//     console.log(response.body);
//     expect(response.body).toMatchObject(tobeDelSong);
//   });
// });
