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
  getPlayersByClubAndSeason,
  getClubById,
  getPlayerById,
  getSeasonById,
} = require("./controller");

app.get("/api", getWelcomeMessage);
app.get("/api/seasons", getSeasons);
app.get("/api/seasons/:id", getSeasonById);
app.get("/api/clubs", getClubs);
app.get("/api/clubs/:id", getClubById);
app.get("/api/players", getPlayers);
app.get("/api/career-entries", getCareerEntries);
app.get("/api/club-seasons", getClubSeasons);
app.get("/api/clubs/:club_id/seasons", getSeasonsForClubsById);
app.get("/api/players/:id", getPlayerById);
app.get(
  "/api/career-entries/:season_id/:club_id/players",
  getPlayersByClubAndSeason
);
app.use((req, res, next) => {
  res.status(404).send({ message: "Path Not Found" });
});

app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else next(err);
});
app.use((err, req, res, next) => {
  if (err.code === "22PO2") {
    console.log(err.status);
    res.status(400).send({ message: "Bad Request" });
  } else next(err);
});
app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ message: "Page Not Found" });
  }
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Server Error" });
});

module.exports = app;
