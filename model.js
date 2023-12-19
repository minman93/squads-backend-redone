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


