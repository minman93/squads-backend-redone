const {
  fetchSeasons,
  fetchClubs,
  fetchPlayers,
  fetchCareerEntries,
  fetchClubSeasons,
  fetchSeasonsForClubsById,
  fetchPlayerById,
  fetchPlayersByClubAndSeason,
  fetchClubById,
  fetchSeasonById,
  addUser,
  authenticateUser,
} = require("./model");

exports.getWelcomeMessage = (request, response, next) => {
  response.status(200).send({ message: "Welcome!" }).catch(next);
};

exports.getSeasons = (request, response, next) => {
  fetchSeasons()
    .then((seasonsArray) => {
      response.status(200).send({ seasons: seasonsArray });
    })
    .catch(next);
};
exports.getSeasonById = (request, response, next) => {
  const seasonId = request.params.id;
  fetchSeasonById(seasonId)
    .then((season) => {
      response.status(200).send({ season });
    })
    .catch(next);
};

exports.getClubs = (request, response, next) => {
  fetchClubs()
    .then((clubsArray) => {
      response.status(200).send({ clubs: clubsArray });
    })
    .catch(next);
};
exports.getClubById = (request, response, next) => {
  const clubId = request.params.id;
  fetchClubById(clubId)
    .then((club) => {
      response.status(200).send({ club });
    })
    .catch(next);
};

exports.getPlayers = (request, response, next) => {
  fetchPlayers()
    .then((playersArray) => {
      response.status(200).send({ players: playersArray });
    })
    .catch(next);
};
exports.getCareerEntries = (request, response, next) => {
  fetchCareerEntries()
    .then((careerEntriesArray) => {
      response.status(200).send({ careerEntries: careerEntriesArray });
    })
    .catch(next);
};
exports.getClubSeasons = (request, response, next) => {
  fetchClubSeasons()
    .then((clubSeasonsArray) => {
      response.status(200).send({ clubSeasons: clubSeasonsArray });
    })
    .catch(next);
};
exports.getSeasonsForClubsById = (request, response, next) => {
  const clubId = request.params.club_id;
  fetchSeasonsForClubsById(clubId)
    .then((seasonsArray) => {
      response.status(200).send(seasonsArray);
    })
    .catch(next);
};
exports.getPlayerById = (request, response, next) => {
  const playerId = request.params.id;
  fetchPlayerById(playerId)
    .then((player) => {
      response.status(200).send(player);
    })
    .catch(next);
};
exports.getPlayersByClubAndSeason = (request, response, next) => {
  const seasonId = request.params.season_id;
  const clubId = request.params.club_id;
  fetchPlayersByClubAndSeason(seasonId, clubId)
    .then((players) => {
      response.status(200).send(players);
    })
    .catch(next);
};

exports.postUser = async (request, response, next) => {
  const { username, password, email } = request.body;

  await addUser(username, password, email)
    .then((userData) => {
      response.status(201).send({ userData });
    })
    .catch(next);
};
exports.loginUser = async (request, response, next) => {
  const { username, password } = request.body;

  try {
    const user = await authenticateUser(username, password);

    if (user) {
      response
        .status(200)
        .send({ message: "Login successful", username: user.username });
    } else {
      response.status(401).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};
