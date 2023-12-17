const express = require("express");
const app = express();
app.use(express.json());
const { getWelcomeMessage, getSeasons, getClubs } = require("./controller");

app.get("/api", getWelcomeMessage);
app.get("/api/seasons", getSeasons);
app.get("/api/clubs", getClubs);



module.exports = app;
