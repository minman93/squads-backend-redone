const db = require("../connection");
const format = require("pg-format");

const seed = async ({
  seasons,
  clubs,
  players,
  careerEntries,
  clubSeasons,
  users,
}) => {
  try {
    await db.query(`DROP TABLE IF EXISTS career_entries CASCADE;`);
    console.log("Dropped career_entries table");
    await db.query(`DROP TABLE IF EXISTS players CASCADE;`);
    console.log("Dropped players table");
    await db.query(`DROP TABLE IF EXISTS clubs CASCADE;`);
    console.log("Dropped clubs table");
    await db.query(`DROP TABLE IF EXISTS seasons CASCADE;`);
    console.log("Dropped seasons table");
    await db.query(`DROP TABLE IF EXISTS club_seasons CASCADE;`);
    console.log("Dropped club_seasons table");
    await db.query(`DROP TABLE IF EXISTS users CASCADE;`);
    console.log("Dropped users table");

    await db.query(`
      CREATE TABLE players (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        dob VARCHAR(15),
        position VARCHAR(20),
        initials VARCHAR(10),
        nation VARCHAR(30)
      );`);
    console.log("Created players table");

    await db.query(`
      CREATE TABLE clubs (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        badge VARCHAR(500),
        primary_colour VARCHAR(100),
        secondary_colour VARCHAR(100),
        shirt VARCHAR(100)
      );`);
    console.log("Created clubs table");

    await db.query(`
      CREATE TABLE seasons (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255)
      );`);
    console.log("Created seasons table");

    await db.query(`
      CREATE TABLE career_entries (
        id SERIAL PRIMARY KEY,
        player_id INT REFERENCES players(id),
        squad_number INT,
        club_id INT REFERENCES clubs(id),
        season_id INT REFERENCES seasons(id),
        image_url VARCHAR(500)
      );`);
    console.log("Created career_entries table");

    await db.query(`
      CREATE TABLE club_seasons (
        id SERIAL PRIMARY KEY,
        club_id INT REFERENCES clubs(id),
        season_id INT REFERENCES seasons(id)
      );`);
    console.log("Created club_seasons table");

    await db.query(` CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE );`);

    console.log("Created users table successfully");

    const insertPlayersQueryStr = format(
      "INSERT INTO players (name, dob, position, initials, nation) VALUES %L RETURNING *;",
      players.map(({ name, dob, position, initials, nation }) => [
        name,
        dob,
        position,
        initials,
        nation,
      ])
    );
    await db.query(insertPlayersQueryStr);
    console.log("Inserted players data");

    const insertClubsQueryStr = format(
      "INSERT INTO clubs (name, badge, primary_colour, secondary_colour, shirt) VALUES %L RETURNING *;",
      clubs.map(({ name, badge, primaryColour, secondaryColour, shirt }) => [
        name,
        badge,
        primaryColour,
        secondaryColour,
        shirt,
      ])
    );
    await db.query(insertClubsQueryStr);
    console.log("Inserted clubs data");

    const insertSeasonsQueryStr = format(
      "INSERT INTO seasons (name) VALUES %L RETURNING *;",
      seasons.map(({ name }) => [name])
    );
    await db.query(insertSeasonsQueryStr);
    console.log("Inserted seasons data");

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
    await db.query(insertCareerEntriesQueryStr);
    console.log("Inserted career_entries data");

    const insertClubSeasonsQueryStr = format(
      "INSERT INTO club_seasons (club_id, season_id) VALUES %L RETURNING *;",
      clubSeasons.map(({ club_id, season_id }) => [club_id, season_id])
    );
    await db.query(insertClubSeasonsQueryStr);
    console.log("Inserted club_seasons data");

    const insertUsersQueryStr = format(
      "INSERT INTO users (username, password, email) VALUES %L RETURNING *;",
      users.map(({ username, password, email }) => [username, password, email])
    );

    await db.query(insertUsersQueryStr);
    console.log("Inserted users data");

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = seed;
