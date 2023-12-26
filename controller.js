const {
  fetchSeasons,
  fetchClubs,
  fetchPlayers,
  fetchCareerEntries,
  fetchClubSeasons,
  fetchSeasonsForClubsById,
} = require("./model");

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
exports.getCareerEntries = (request, response, next) => {
  fetchCareerEntries().then((careerEntriesArray) => {
    response.status(200).send({ careerEntries: careerEntriesArray });
  });
};
exports.getClubSeasons = (request, response, next) => {
  fetchClubSeasons().then((clubSeasonsArray) => {
    response.status(200).send({ clubSeasons: clubSeasonsArray });
  });
};
exports.getSeasonsForClubsById = (request, response, next) => {
  const clubId = request.params.club_id;
  fetchSeasonsForClubsById(clubId).then((seasonsArray) => {
    response.status(200).send(seasonsArray);
  });
};
