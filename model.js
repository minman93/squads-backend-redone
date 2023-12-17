const db = require("./connection");

exports.fetchSeasons = () => {
  const queryString = `SELECT * FROM seasons;`;
  return db.query(queryString).then((seasons) => {
    console.log(seasons.rows);
    return seasons.rows;
  });
};


exports.fetchClubs = () => {
  const queryString = `SELECT * FROM clubs;`;
  return db.query(queryString).then((clubs) => {
    console.log(clubs.rows);
    return clubs.rows;
  });
};
