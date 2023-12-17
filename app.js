const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors);
const { getWelcomeMessage, getSeasons, getClubs } = require("./controller");

app.get("/api", getWelcomeMessage);
app.get("/api/seasons", getSeasons);
app.get("/api/clubs", getClubs);



module.exports = app;
