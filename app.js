const express = require("express");
const app = express();
app.use(express.json());
const { getWelcomeMessage } = require("./controller");

app.get("/api", getWelcomeMessage);

module.exports = app;
