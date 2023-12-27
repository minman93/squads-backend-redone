const express = require("express");
// const { graphqlHTTP } = require("express-graphql");
const app = express();
// const schema = require("./schema");

app.use(express.json());

const {
  getWelcomeMessage,
  getSeasons,
  getClubs,
  getPlayers,
  getCareerEntries,
  getClubSeasons,
  getSeasonsForClubsById,
  getPlayerById,
  getCareerEntriesBySeasonId,
  getCareerEntriesBySeasonIdAndClubId,
  getPlayersByClubAndSeason,
} = require("./controller");

app.get("/api", getWelcomeMessage);
app.get("/api/seasons", getSeasons);
app.get("/api/clubs", getClubs);
app.get("/api/players", getPlayers);
app.get("/api/career-entries", getCareerEntries);
app.get("/api/club-seasons", getClubSeasons);
app.get("/api/clubs/:club_id/seasons", getSeasonsForClubsById);
app.get("/api/players/:id", getPlayerById);
app.get("/api/career-entries/:season_id", getCareerEntriesBySeasonId);
app.get(
  "/api/career-entries/:season_id/:club_id",
  getCareerEntriesBySeasonIdAndClubId
);
app.get(
  "/api/career-entries/:season_id/:club_id/players",
  getPlayersByClubAndSeason
);

module.exports = app;
