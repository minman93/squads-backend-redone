const {
  fetchSeasons,
  fetchClubs,
  fetchPlayers,
  fetchCareerEntries,
  fetchClubSeasons,
  fetchSeasonsForClubsById,
  fetchPlayerById,
  fetchCareerEntriesBySeasonId,
  fetchCareerEntriesBySeasonIdAndClubId,
  fetchPlayersByClubAndSeason,
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
exports.getPlayerById = (request, response, next) => {
  const playerId = request.params.id;
  fetchPlayerById(playerId).then((player) => {
    response.status(200).send(player);
  });
};
exports.getCareerEntriesBySeasonId = (request, response, next) => {
  const seasonId = request.params.season_id;
  fetchCareerEntriesBySeasonId(seasonId).then((careerEntries) => {
    response.status(200).send(careerEntries);
  });
};
exports.getCareerEntriesBySeasonIdAndClubId = (request, response, next) => {
  const seasonId = request.params.season_id;
  const clubId = request.params.club_id;
  fetchCareerEntriesBySeasonIdAndClubId(seasonId, clubId).then(
    (careerEntries) => {
      response.status(200).send(careerEntries);
    }
  );
};
exports.getPlayersByClubAndSeason = (request, response, next) => {
  console.log(request.params);
  const seasonId = request.params.season_id;
  const clubId = request.params.club_id;
  fetchPlayersByClubAndSeason(seasonId, clubId).then((players) => {

    response.status(200).send(players);
  });
};
