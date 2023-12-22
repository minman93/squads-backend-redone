const request = require("supertest");
const app = require("../app");
const db = require("../connection");
const testData = require("../test-data/index");
const seed = require("../seeds/seed");

beforeAll(() => seed(testData));

afterAll(() => db.end());

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

  describe("returns all SEASONS with a GET SEASONS request", () => {
    test("returns an array of all seasons in Premier League history from 1993/1994 up to 2023/2024", () => {
      return request(app)
        .get("/api/seasons")
        .then(({ body }) => {
          expect(body.seasons[0]).toHaveProperty("name");
          expect(Array.isArray(body.seasons));
        });
    });
  });
  describe("returns all CLUBS with a GET CLUBS request", () => {
    test("returns an array of all clubs complete with names, IDs, colour codes and badges", () => {
      return request(app)
        .get("/api/clubs")
        .then(({ body }) => {
          expect(body.clubs[0]).toHaveProperty("name");
          expect(body.clubs[0]).toHaveProperty("badge");
          expect(body.clubs[0]).toHaveProperty("primary_colour");
          expect(body.clubs[0]).toHaveProperty("secondary_colour");

          expect(Array.isArray(body.clubs));
        });
    });
  });
  describe("returns all PLAYERS with a GET PLAYERS request", () => {
    test("returns an array of all clubs complete with names, IDs, positions, nations and initials", () => {
      return request(app)
        .get("/api/players")
        .then(({ body }) => {
          expect(body.players[0]).toHaveProperty("name");
          expect(body.players[0]).toHaveProperty("dateofbirth");
          expect(body.players[0]).toHaveProperty("position");
          expect(body.players[0]).toHaveProperty("nation");
          expect(body.players[0]).toHaveProperty("initials");

          expect(Array.isArray(body.players));
        });
    });
  });
  describe("returns all CAREER ENTRIES with a GET CAREER ENTRIES request", () => {
    test("returns an array of all clubs complete with names, IDs, positions, nations and initials", () => {
      return request(app)
        .get("/api/career-entries")
        .then(({ body }) => {
          expect(body.careerEntries[0]).toHaveProperty("player_id");
          expect(body.careerEntries[0]).toHaveProperty("squad_number");
          expect(body.careerEntries[0]).toHaveProperty("season_id");
          expect(body.careerEntries[0]).toHaveProperty("club_id");
          expect(body.careerEntries[0]).toHaveProperty("image_url");

          expect(Array.isArray(body.players));
        });
    });
  });
  describe("returns all CLUB SEASONS with a GET CLUB SEASONS request", () => {
    test("returns an array of all clubs complete with names and ids", () => {
      return request(app)
        .get("/api/club-seasons")
        .then(({ body }) => {
          expect(body.clubSeasons[0]).toHaveProperty("season_id");

          expect(Array.isArray(body.clubSeasons));
        });
    });
  });
});


