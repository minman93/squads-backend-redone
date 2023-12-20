const express = require("express");
// const { graphqlHTTP } = require("express-graphql");
const app = express();
// const schema = require("./schema");

app.use(express.json());

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     pretty: true,
//     graphiql: true,
//   })
// );

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

//hklg

module.exports = app;
