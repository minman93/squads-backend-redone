const express = require("express");
const app = express();

app.use(express.json());

const {
  getWelcomeMessage,
  getSeasons,
  getClubs,
  getPlayers,
  getCareerEntries,
  getSeasonByName,
} = require("./controller");

app.get("/api", getWelcomeMessage);
app.get("/api/seasons", getSeasons);
app.get("/api/clubs", getClubs);
app.get("/api/players", getPlayers);
app.get("/api/career-entries", getCareerEntries);
app.get("/api/seasons/:name", getSeasonByName);



module.exports = app;
