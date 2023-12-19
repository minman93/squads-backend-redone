const express = require("express");
const app = express();

app.use(express.json());

const {
  getWelcomeMessage,
  getSeasons,
  getClubs,
  getPlayers,
  getCareerEntries,
} = require("./controller");

app.get("/api", getWelcomeMessage);
app.get("/api/seasons", getSeasons);
app.get("/api/clubs", getClubs);
app.get("/api/players", getPlayers);
app.get("/api/career-entries", getCareerEntries);




module.exports = app;
