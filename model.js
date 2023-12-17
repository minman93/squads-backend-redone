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
