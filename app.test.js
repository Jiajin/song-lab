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

// describe.only("GET /songs/:id", () => {
//   it("should respond with the specified song", async () => {
//     const response = await request(app)
//       .get(`/songs/${1}`)
//       .send(song)
//       .expect(200);
//     expect(response.body.name).toEqual("testSongName");
//     expect(response.body.artist).toEqual("testArtist");
//   });
// });
