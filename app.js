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
  getClubSeasons,
  getSeasonsForClubsById,
} = require("./controller");

app.get("/api", getWelcomeMessage);
app.get("/api/seasons", getSeasons);
app.get("/api/clubs", getClubs);
app.get("/api/players", getPlayers);
app.get("/api/career-entries", getCareerEntries);
app.get("/api/club-seasons", getClubSeasons);
app.get("/api/clubs/:club_id/seasons", getSeasonsForClubsById);

module.exports = app;
