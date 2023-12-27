const request = require("supertest");
const app = require("../app");
const db = require("../connection");
const testData = require("../data/index");
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
          expect(body.players[0]).toHaveProperty("dob");
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
  describe("returns list of seasons that are associated with a club", () => {
    test("returns Barnsley's list of seasons when passed Barnsley's club ID", () => {
      const clubId = 3;
      const season = "1997/1998";
      return request(app)
        .get(`/api/clubs/${clubId}/seasons`)
        .then(({ body }) => {
          expect(body[0].name).toEqual(season);
        });
    });
    test("returns Arsenal's list of seasons when passed Arsenal's club ID", () => {
      const clubId = 1;
      const seasons = [
        {
          id: 1,
          name: "1992/1993",
        },
        {
          id: 2,
          name: "1993/1994",
        },
        {
          id: 3,
          name: "1994/1995",
        },
        {
          id: 4,
          name: "1995/1996",
        },
        {
          id: 5,
          name: "1996/1997",
        },
        {
          id: 6,
          name: "1997/1998",
        },
        {
          id: 7,
          name: "1998/1999",
        },
        {
          id: 8,
          name: "1999/2000",
        },
        {
          id: 9,
          name: "2000/2001",
        },
        {
          id: 10,
          name: "2001/2002",
        },
        {
          id: 11,
          name: "2002/2003",
        },
        {
          id: 12,
          name: "2003/2004",
        },
        {
          id: 13,
          name: "2004/2005",
        },
        {
          id: 14,
          name: "2005/2006",
        },
        {
          id: 15,
          name: "2006/2007",
        },
        {
          id: 16,
          name: "2007/2008",
        },
        {
          id: 17,
          name: "2008/2009",
        },
        {
          id: 18,
          name: "2009/2010",
        },
        {
          id: 19,
          name: "2010/2011",
        },
        {
          id: 20,
          name: "2011/2012",
        },
        {
          id: 21,
          name: "2012/2013",
        },
        {
          id: 22,
          name: "2013/2014",
        },
        {
          id: 23,
          name: "2014/2015",
        },
        {
          id: 24,
          name: "2015/2016",
        },
        {
          id: 25,
          name: "2016/2017",
        },
        {
          id: 26,
          name: "2017/2018",
        },
        {
          id: 27,
          name: "2018/2019",
        },
        {
          id: 28,
          name: "2019/2020",
        },
        {
          id: 29,
          name: "2020/2021",
        },
        {
          id: 30,
          name: "2021/2022",
        },
        {
          id: 31,
          name: "2022/2023",
        },
        {
          id: 32,
          name: "2023/2024",
        },
      ];
      return request(app)
        .get(`/api/clubs/${clubId}/seasons`)
        .then(({ body }) => {
          expect(body).toEqual(seasons);
        });
    });
  });
  describe("returns a single player by id", () => {
    test("returns Dennis Bergkamp when requesting his id number", () => {
      const playerId = 3;
      return request(app)
        .get(`/api/players/${playerId}`)
        .then(({ body }) => {
          expect(body[0].name).toEqual("Dennis Bergkamp");
        });
    });
  });
  describe("returns all career entries from a single season", () => {
    test("returns all career entries from a single season", () => {
      const seasonId = 12;
      return request(app)
        .get(`/api/career-entries/${seasonId}`)
        .then(({ body }) => {
          console.log("Console log body in tests ----->", body);
          expect(body[0].season_id).toEqual(12);
          expect(body[1].season_id).toEqual(12);
        });
    });
  });
});

