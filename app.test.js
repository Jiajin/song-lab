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

//Mock DB testing
describe("GET /mockdb/song/:id", () => {
  it("Should return  the correct  song", async () => {
    const expectedSong = { name: "testSongName", artist: "testArtist" };

    const response = await request(app).get("/mockDb/song/1").expect(200);
    expect(response.body).toMatchObject(expectedSong);
  });
});

describe.only("GET /mockdb/fail", () => {
  it("Should return 500 error when server is down", async () => {
    const response = await request(app).get("/mockDb/fail").expect(500);
  });
});
//end Mock DB testing
