const format = require("pg-format");
const db = require("../connection");

const seed = ({ seasons, clubs, players, careerEntries }) => {
  return db
    .query(`DROP TABLE IF EXISTS career_entries;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS players;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS clubs;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS seasons;`);
    })
    .then(() => {
      const seasonsTablePromise = db.query(`
        CREATE TABLE seasons (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255)
        );`);

      const clubsTablePromise = db.query(`
        CREATE TABLE clubs (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50),
          badge VARCHAR(500),
          primary_colour VARCHAR(10),
          secondary_colour VARCHAR(10)
        );`);

      const playersTablePromise = db.query(`
        CREATE TABLE players (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100),
          dateofbirth VARCHAR(15),
          position VARCHAR(20),
          initials VARCHAR(10),
          nation VARCHAR(30)
        );`);

      return Promise.all([
        seasonsTablePromise,
        clubsTablePromise,
        playersTablePromise,
      ]);
    })
    .then(() => {
      const insertSeasonsQueryStr = format(
        "INSERT INTO seasons (name) VALUES %L RETURNING *;",
        seasons.map(({ name }) => [name])
      );
      const seasonsPromise = db.query(insertSeasonsQueryStr);

      const insertClubsQueryStr = format(
        "INSERT INTO clubs (name, badge, primary_colour, secondary_colour) VALUES %L RETURNING *;",
        clubs.map(({ name, badge, primary_colour, secondary_colour }) => [
          name,
          badge,
          primary_colour,
          secondary_colour,
        ])
      );
      const clubsPromise = db.query(insertClubsQueryStr);

      const insertPlayersQueryStr = format(
        "INSERT INTO players (name, dateofbirth, position, initials, nation) VALUES %L RETURNING *;",
        players.map(({ name, dateofbirth, position, initials, nation }) => [
          name,
          dateofbirth,
          position,
          initials,
          nation,
        ])
      );
      const playersPromise = db.query(insertPlayersQueryStr);

      return Promise.all([seasonsPromise, clubsPromise, playersPromise]);
    })
    .then(() => {
      const formattedCareerEntries = careerEntries.map((entry) => {
        // Adjust this mapping based on the actual structure of your careerEntries data
        return {
          player_id: entry.player_id,
          squad_number: entry.squad_number,
          club_id: entry.club_id,
          season_id: entry.season_id,
          image_url: entry.image_url,
        };
      });

      const insertCareerEntriesQueryStr = format(
        "INSERT INTO career_entries (player_id, squad_number, club_id, season_id, image_url) VALUES %L RETURNING *;",
        formattedCareerEntries.map(
          ({ player_id, squad_number, club_id, season_id, image_url }) => [
            player_id,
            squad_number,
            club_id,
            season_id,
            image_url,
          ]
        )
      );

      return db.query(insertCareerEntriesQueryStr);
    });
};

module.exports = seed;
