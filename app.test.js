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
