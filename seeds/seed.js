const db = require("../connection");
const format = require("pg-format");
const {
  seasons,
  clubs,
  players,
  careerEntries,
  clubSeasons,
} = require("../data/test-data/index");

const seed = ({ seasons, clubs, players, careerEntries, clubSeasons }) => {
  return db
    .query(`DROP TABLE IF EXISTS career_entries CASCADE;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS players CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS clubs CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS seasons CASCADE;`);
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS club_seasons CASCADE;");
    })

    .then(() => {
      const playersTablePromise = db.query(`
          CREATE TABLE players (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            dateofbirth VARCHAR(15),
            position VARCHAR(20),
            initials VARCHAR(10),
            nation VARCHAR(30)
          );`);
      console.log("Created players table");

      const clubsTablePromise = db.query(`
          CREATE TABLE clubs (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            badge VARCHAR(500),
            primary_colour VARCHAR(10),
            secondary_colour VARCHAR(10)
          );`);
      console.log("Created clubs table");

      const seasonsTablePromise = db.query(`
          CREATE TABLE seasons (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255)
          );`);
      console.log("Created seasons table");

      const careerEntriesTablePromise = db.query(`
          CREATE TABLE career_entries (
            id SERIAL PRIMARY KEY,
            player_id INT REFERENCES players(id),
            squad_number INT,
            club_id INT REFERENCES clubs(id),
            season_id INT REFERENCES seasons(id),
            image_url VARCHAR(500)
          );`);
      console.log("Created career_entries table");

      const clubSeasonsTablePromise = db.query(
        `CREATE TABLE club_seasons (id SERIAL PRIMARY KEY, club_id INT REFERENCES clubs(id), season_id INT REFERENCES seasons(id) );`
      );

      return Promise.all([
        playersTablePromise,
        clubsTablePromise,
        seasonsTablePromise,
        careerEntriesTablePromise,
        clubSeasonsTablePromise,
      ]);
    })
    .then(() => {
      console.log("Tables created successfully");
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

      const insertSeasonsQueryStr = format(
        "INSERT INTO seasons (name) VALUES %L RETURNING *;",
        seasons.map(({ name }) => [name])
      );
      const seasonsPromise = db.query(insertSeasonsQueryStr);

      return Promise.all([playersPromise, clubsPromise, seasonsPromise]);
    })
    .then(() => {
      console.log("Data for first three tables inserted successfully");
    })
    .then(() => {
      const insertCareerEntriesQueryStr = format(
        "INSERT INTO career_entries (player_id, squad_number, club_id, season_id, image_url) VALUES %L RETURNING *;",
        careerEntries.map(
          ({ player_id, squad_number, club_id, season_id, image_url }) => [
            player_id,
            squad_number,
            club_id,
            season_id,
            image_url,
          ]
        )
      );
      const careerEntriesPromise = db.query(insertCareerEntriesQueryStr);

      const insertClubSeasonsQueryStr = format(
        "INSERT INTO club_seasons (club_id, season_id) VALUES %L RETURNING *;",
        clubSeasons.map(({ club_id, season_id }) => {
          console.log(club_id, season_id)[(club_id, season_id)];
        })
      );
      const clubSeasonsPromise = db.query(insertClubSeasonsQueryStr);

      return Promise.all([careerEntriesPromise, clubSeasonsPromise]);
    })
    .then(console.log("Data for career_entries inserted successfully"))
    .catch((error) => {
      console.error("Error:", error);
    });
};

module.exports = seed;
