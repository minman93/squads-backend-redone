const db = require("./connection");
const { players } = require("./data");

exports.fetchSeasons = () => {
  const queryString = `SELECT * FROM seasons;`;
  return db.query(queryString).then((seasons) => {
    if (seasons.rows.length === 0) {
      return Promise.reject({ status: 404, message: "Path Not Found" });
    }
    return seasons.rows;
  });
};
exports.fetchSeasonById = (seasonId) => {
  const queryString = `SELECT * FROM seasons WHERE id = $1`;
  return db.query(queryString, [seasonId]).then((season) => {
    if (season.rows.length === 0) {
      return Promise.reject({
        status: 404,
        message: "Season Not Found. Season IDs range from 1-32.",
      });
    }
    return season.rows;
  });
};

exports.fetchClubs = () => {
  const queryString = `SELECT * FROM clubs;`;
  return db.query(queryString).then((clubs) => {
    return clubs.rows;
  });
};
exports.fetchClubById = (clubId) => {
  const queryString = `SELECT * FROM clubs WHERE id = $1`;
  return db.query(queryString, [clubId]).then((club) => {
    if (club.rows.length === 0) {
      return Promise.reject({
        status: 404,
        message: "Club Not Found. Club IDs range from 1-51.",
      });
    }
    return club.rows;
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
exports.fetchPlayerById = (playerId) => {
  const queryString = `SELECT * FROM players WHERE id = $1;`;
  return db.query(queryString, [playerId]).then((player) => {
    if (player.rows.length === 0) {
      return Promise.reject({
        status: 404,
        message: `Player Not Found. Player IDs range from 1-${players.length}`,
      });
    }

    return player.rows;
  });
};
exports.fetchSeasonsForClubsById = (clubId) => {
  const queryString = `SELECT seasons.* FROM seasons JOIN club_seasons on seasons.id = club_seasons.season_id WHERE club_seasons.club_id = $1`;
  return db.query(queryString, [clubId]).then((seasonsForClubs) => {
    if (seasonsForClubs.rows.length === 0) {
      return Promise.reject({
        status: 404,
        message: "Club Seasons Not Found. Club IDs range from 1-51.",
      });
    }
    return seasonsForClubs.rows;
  });
};

exports.fetchPlayersByClubAndSeason = (seasonId, clubId) => {
  const queryString = `
    SELECT
      p.*,
      ce.*
    FROM
      players p
    JOIN
      career_entries ce ON p.id = ce.player_id
    WHERE
      ce.season_id = $1
      AND ce.club_id = $2;
  `;
  return db.query(queryString, [seasonId, clubId]).then((players) => {
    if (seasonId > 32 || clubId > 51) {
      return Promise.reject({
        status: 404,
        message:
          "Career Entries Not Found. Season IDs range from 1-32 and Club IDs range from 1-51.",
      });
    }
    if (players.rows.length === 0) {
      return Promise.reject({
        status: 404,
        message:
          "Career Entries Not Found. Sorry, this data is under construction!",
      });
    }
    return players.rows;
  });
};


