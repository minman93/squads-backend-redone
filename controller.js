const { fetchSeasons, fetchClubs, fetchPlayers } = require("./model");

exports.getWelcomeMessage = (request, response, next) => {
  response.status(200).send({ message: "Hello World!" });
};

exports.getSeasons = (request, response, next) => {
  fetchSeasons().then((seasonsArray) => {
    response.status(200).send({ seasons: seasonsArray });
  });
};

exports.getClubs = (request, response, next) => {
  fetchClubs().then((clubsArray) => {
    response.status(200).send({ clubs: clubsArray });
  });
};

exports.getPlayers = (request, response, next) => {
  fetchPlayers().then((playersArray) => {
    response.status(200).send({ players: playersArray });
  });
};
