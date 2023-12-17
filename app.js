const express = require("express");
const app = express();
app.use(express.json());
const { getWelcomeMessage, getSeasons } = require("./controller");

app.get("/api", getWelcomeMessage);
app.get("/api/seasons", getSeasons);



module.exports = app;
