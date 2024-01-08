const request = require("supertest");
const app = require("../app");
const db = require("../connection");
const testData = require("../data/index");
const seed = require("../seeds/seed");



beforeAll(() => seed(testData));

afterAll(() => db.end());

describe("ALL TESTS", () => {
  describe("APP", () => {
    describe("return status code of 200 for /api endpoint, returns a welcome message to the user, returns an error message when an invalid path is entered", () => {
      test("returns a status code of 200", () => {
        return request(app).get("/api").expect(200);
      });
      test("should return 'Welcome!' to the user", () => {
        return request(app)
          .get("/api")
          .then(({ body }) => {
            expect(body.message).toEqual("Welcome!");
          });
      });
      test("should return 'Path Not Found' message when an invalid path is entered", () => {
        return request(app)
          .get("/invalid-path")
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toBe("Path Not Found");
          });
      });
    });
  });
  describe("SEASONS", () => {
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
    describe("returns a specific SEASON when passed a single valid SEASON ID, handles errors when an invalid SEASON ID is passed", () => {
      test("returns with the 1992/1993 season when passed season id 1", () => {
        const seasonId = 1;
        const seasonName = "1992/1993";
        return request(app)
          .get(`/api/seasons/${seasonId}`)
          .then(({ body }) => {
            expect(Array.isArray(body.season));
            expect(body.season[0]).toHaveProperty("name");
            expect(body.season[0].name).toBe(seasonName);
          });
      });
      test("returns error message when passed an invalid season id", () => {
        const seasonId = 40;
        const message = "Season Not Found. Season IDs range from 1-32.";
        return request(app)
          .get(`/api/seasons/${seasonId}`)
          .then(({ body }) => {
            expect(body.message).toBe(message);
          });
      });
    });
  });
  describe("CLUBS", () => {
    describe("returns all CLUBS with a GET CLUBS request", () => {
      test("returns an array of all clubs complete with names, IDs, colour codes, shirts and badges", () => {
        return request(app)
          .get("/api/clubs")
          .then(({ body }) => {
            expect(body.clubs[0]).toHaveProperty("name");
            expect(body.clubs[0]).toHaveProperty("badge");
            expect(body.clubs[0]).toHaveProperty("primary_colour");
            expect(body.clubs[0]).toHaveProperty("secondary_colour");
            expect(body.clubs[0]).toHaveProperty("shirt");
            expect(Array.isArray(body.clubs));
          });
      });
    });
    describe("returns a specific CLUB when passed a single valid CLUB ID, handles errors when an invalid CLUB ID is passed", () => {
      test("returns the club Arsenal when passed club id 1", () => {
        const clubId = 1;
        const arsenal = {
          id: 1,
          name: "Arsenal",
          badge:
            "https://upload.wikimedia.org/wikipedia/hif/8/82/Arsenal_FC.png",
          primaryColour: "#EF0107",
          secondaryColour: "#FFFFFF",
          shirt: "https://i.imgur.com/9kpzk4d.png",
        };
        return request(app)
          .get(`/api/clubs/${clubId}`)
          .then(({ body }) => {
            expect(Array.isArray(body.club));
            expect(body.club[0]).toHaveProperty("name");
            expect(body.club[0].name).toBe(arsenal.name);
            expect(body.club[0].badge).toBe(arsenal.badge);
            expect(body.club[0].primary_colour).toBe(arsenal.primaryColour);
            expect(body.club[0].secondary_colour).toBe(arsenal.secondaryColour);
            expect(body.club[0].shirt).toBe(arsenal.shirt);
          });
      });
      test("returns error message when passed an invalid club id", () => {
        const clubId = 55;
        const message = "Club Not Found. Club IDs range from 1-51.";
        return request(app)
          .get(`/api/clubs/${clubId}`)
          .then(({ body }) => {
            expect(body.message).toBe(message);
          });
      });
    });
  });
  describe("PLAYERS", () => {
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
    describe("returns a single PLAYER when passed a valid PLAYER ID, handles errors when an invalid PLAYER ID is passed", () => {
      test("returns Dennis Bergkamp when requesting his id number", () => {
        const playerId = 3;
        return request(app)
          .get(`/api/players/${playerId}`)
          .then(({ body }) => {
            expect(body[0].name).toEqual("Dennis Bergkamp");
          });
      });
      test("returns error message when passed an invalid PLAYER ID", () => {
        const players = testData.players;
        const playerId = players.length + 1;
        const message = `Player Not Found. Player IDs range from 1-${players.length}`;
        return request(app)
          .get(`/api/players/${playerId}`)
          .then(({ body }) => {
            expect(body.message).toBe(message);
          });
      });
    });
  });
  describe("CAREER ENTRIES", () => {
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

    describe("returns all players with a CAREER ENTRY in a single CLUB in a single SEASON and handles errors when an invalid CLUB ID or SEASON ID is passed", () => {
      test("returns all players with a career entry in a single club in a single season", () => {
        const seasonId = 12;
        const clubId = 1;
        return request(app)
          .get(`/api/career-entries/${seasonId}/${clubId}/players`)
          .then(({ body }) => {
            expect(body[0].name).toEqual("Jens Lehmann");
          });
      });
      test("returns an error message when an invalid SEASON ID is passed", () => {
        const seasonId = 40;
        const clubId = 1;
        const message =
          "Career Entries Not Found. Season IDs range from 1-32 and Club IDs range from 1-51.";
        return request(app)
          .get(`/api/career-entries/${seasonId}/${clubId}/players`)
          .then(({ body }) => {
            expect(body.message).toEqual(message);
          });
      });
      test("returns an error message when an invalid CLUB ID is passed", () => {
        const seasonId = 12;
        const clubId = 55;
        const message =
          "Career Entries Not Found. Season IDs range from 1-32 and Club IDs range from 1-51.";
        return request(app)
          .get(`/api/career-entries/${seasonId}/${clubId}/players`)
          .then(({ body }) => {
            expect(body.message).toEqual(message);
          });
      });
      test("returns an under construction message when a a valid club ID is entered but no data is returned", () => {
        const seasonId = 13;
        const clubId = 9;
        const message =
          "Career Entries Not Found. Sorry, this data is under construction!";
        return request(app)
          .get(`/api/career-entries/${seasonId}/${clubId}/players`)
          .then(({ body }) => {
            expect(body.message).toEqual(message);
          });
      });
    });
  });

  describe("CLUB SEASONS", () => {
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
    describe("returns lists of SEASONS when passed a CLUB ID and handles errors when passed an invalid CLUB ID", () => {
      test("returns Barnsley's single season when passed Barnsley's club ID", () => {
        const clubId = 3;
        const season = "1997/1998";
        return request(app)
          .get(`/api/clubs/${clubId}/seasons`)
          .then(({ body }) => {
            expect(Array.isArray(body.seasons));
            expect(body[0]).toHaveProperty("name");
            expect(body[0]).toHaveProperty("id");
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
            expect(Array.isArray(body.seasons));
            expect(body[0]).toHaveProperty("name");
            expect(body[0]).toHaveProperty("id");
            expect(body).toEqual(seasons);
          });
      });
      test("returns an error message when an invalid club ID is passed", () => {
        const clubId = 55;
        const message = "Club Seasons Not Found. Club IDs range from 1-51.";
        return request(app)
          .get(`/api/clubs/${clubId}/seasons`)
          .then(({ body }) => {
            expect(body.message).toEqual(message);
          });
      });
    });
  });
});

