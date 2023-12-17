const express = require("express");

const { PORT = 9090 } = process.env;

const app = express();

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

app.get("/api", (req, res) => {
  res.send("Hello World!");
});
