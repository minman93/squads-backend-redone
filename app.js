const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(cors());

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
  getClubById,
} = require("./controller");

app.get("/api", getWelcomeMessage);
app.get("/api/seasons", getSeasons);
app.get("/api/clubs", getClubs);
app.get("/api/clubs/:id", getClubById);
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
