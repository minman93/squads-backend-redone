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
exports.fetchSeasonByName = (name) => {
  const queryString = `SELECT * FROM seasons WHERE name = $1`;
  return db.query(queryString, name).then((season) => {
    if (name.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Path not found" });
    }
    return season.rows;
  });
};

