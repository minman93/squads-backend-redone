const db = require("./connection");


exports.fetchSeasons = () => {
  const queryString = `SELECT * FROM seasons;`;
  return db.query(queryString).then((seasons) => {
    return seasons.rows;
  });
};

exports.fetchClubs = () => {
  const queryString = `SELECT * FROM clubs;`;
  return db.query(queryString).then((clubs) => {
    return clubs.rows;
  });
};

exports.fetchPlayers = () => {
  const queryString = `SELECT * FROM players;`;
  return db.query(queryString).then((players) => {
    return players.rows;
  });
};
exports.fetchCareerEntries = () => {
  const queryString = `SELECT * FROM career_entries;`;
  return db.query(queryString).then((careerEntries) => {
    return careerEntries.rows;
  });
};
exports.fetchClubSeasons = () => {
  const queryString = `SELECT * FROM club_seasons;`;
  return db.query(queryString).then((clubSeasons) => {
    return clubSeasons.rows;
  });
};
exports.fetchSeasonsForClubsById = (clubId) => {
  const queryString = `SELECT seasons.* FROM seasons JOIN club_seasons on seasons.id = club_seasons.season_id WHERE club_seasons.club_id = $1`;
  return db.query(queryString, [clubId]).then((seasonsForClubs) => {
    return seasonsForClubs.rows;
  });
};
exports.fetchPlayerById = (playerId) => {
  const queryString = `SELECT * FROM players WHERE id = $1;`;
  return db.query(queryString, [playerId]).then((player) => {
    console.log(player);
    return player.rows;
  });
};
exports.fetchCareerEntriesBySeasonId = (seasonId) => {
  const queryString = `SELECT * FROM career_entries WHERE season_id = $1;`;
  return db.query(queryString, [seasonId]).then((careerEntries) => {
    return careerEntries.rows;
  });
};
