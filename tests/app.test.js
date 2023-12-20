const request = require("supertest");
const app = require("../app");
const db = require("../connection");
require("dotenv").config({ path: ".env.test" });
const testData = require("../test-data/index");

beforeEach(() => seed(testData));

afterEach(() => db.end());  
describe("app", () => {
  describe("get welcome message", () => {
    test("returns a status code of 200", () => {
      return request(app).get("/api").expect(200);
    });
    test("should return Hello World to the user", () => {
      return request(app)
        .get("/api")
        .then(({ body }) => {
          expect(body.message).toEqual("Hello World!");
        });
    });
  });
});
describe("returns all SEASONS with a GET SEASONS request", () => {
  test("returns an array of all seasons in Premier League history from 1993/1994 up to 2023/2024", () => {
    return request(app)
      .get("/api/seasons")
      .then(({ body }) => {
        expect(body.seasons[0]).toHaveProperty("name");
        expect(Array.isArray(body.seasons));
      });
  });
  // describe("returns all CLUBS with a GET CLUBS request", () => {
  //   test("returns an array of all clubs complete with names, IDs, colour codes and badges", () => {
  //     return request(app)
  //       .get("/api/clubs")
  //       .then(({ body }) => {
  //         expect(body.clubs[0]).toHaveProperty("name");
  //         expect(body.clubs[0]).toHaveProperty("badge");
  //         expect(body.clubs[0]).toHaveProperty("primary_colour");
  //         expect(body.clubs[0]).toHaveProperty("secondary_colour");

  //         expect(Array.isArray(body.clubs));
  //       });
  //   });
  // });
  // describe("returns all PLAYERS with a GET PLAYERS request", () => {
  //   test("returns an array of all clubs complete with names, IDs, positions, nations and initials", () => {
  //     return request(app)
  //       .get("/api/players")
  //       .then(({ body }) => {
  //         expect(body.players[0]).toHaveProperty("name");
  //         expect(body.players[0]).toHaveProperty("dob");
  //         expect(body.players[0]).toHaveProperty("position");
  //         expect(body.players[0]).toHaveProperty("nation");
  //         expect(body.players[0]).toHaveProperty("initials");

  //         expect(Array.isArray(body.players));
  //       });
  //   });
});
// });

