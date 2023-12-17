const request = require("supertest");
const app = require("../app");
const db = require("../connection");
require("dotenv").config({ path: ".env.test" });

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
          expect(body.seasons[0]).toHaveProperty("season");
          expect(Array.isArray(body.seasons));
        });
    });
  });
});