const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
const seasons = require("./season-data");
const readClubs = require("./club-data");
const readPlayers = require("./player-data");
const readCareerEntries = require("./career-entries-data");

require("dotenv").config({
  path: `${__dirname}/./.env.${ENV}`,
});

const config =
  ENV === "production"
    ? { connectionString: process.env.DATABASE_URL, max: 2 }
    : {};
let pool = new Pool(config);

const seedData = async () => {
  const dropSeasons = "DROP TABLE IF EXISTS seasons CASCADE";
  const createSeasons = `CREATE TABLE seasons (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255)
      )`;
  const dropClubs = "DROP TABLE IF EXISTS clubs CASCADE";
  const createClubs = `CREATE TABLE clubs (
    id SERIAL PRIMARY KEY, name VARCHAR(50), badge VARCHAR(500), primary_colour VARCHAR(10), secondary_colour VARCHAR(10)
  )`;
  const dropPlayers = "DROP TABLE IF EXISTS players CASCADE";
  const createPlayers = `CREATE TABLE players (
    id SERIAL PRIMARY KEY, name VARCHAR(100), dateofbirth VARCHAR(15), position VARCHAR(20), initials VARCHAR(10), nation VARCHAR(30)
  )`;
  const dropCareerEntries = "DROP TABLE IF EXISTS career_entries CASCADE";
  const createCareerEntries = `CREATE TABLE career_entries (id SERIAL PRIMARY KEY, player_id INT REFERENCES players(id), squad_number INT, club_id INT REFERENCES clubs(id), season_id INT REFERENCES seasons(id), image_url VARCHAR(500) )`;

  await pool.query(dropSeasons);
  await pool.query(dropClubs);
  await pool.query(dropPlayers);
  await pool.query(createSeasons);
  await pool.query(createClubs);
  await pool.query(createPlayers);
  await pool.query(dropCareerEntries);
  await pool.query(createCareerEntries);
};

const insertAllSeasons = async () => {
  for (const season of seasons) {
    const query = "INSERT INTO seasons (name) VALUES ($1)";
    const values = [season];

    try {
      await pool.query(query, values);
    } catch (error) {
      console.error("Error inserting season:", error);
    }
  }
};

const insertAllClubs = async () => {
  try {
    const clubsArray = await readClubs();

    for (const club of clubsArray) {
      const { name, badge, primary_colour, secondary_colour } = club;

      const query =
        "INSERT INTO clubs (name, badge, primary_colour, secondary_colour) VALUES ($1, $2, $3, $4)";
      const values = [name, badge, primary_colour, secondary_colour];

      await pool.query(query, values);
    }
  } catch (error) {
    console.error("Error inserting clubs:", error);
  }
};

const insertAllPlayers = async () => {
  try {
    const playersArray = await readPlayers();

    for (const player of playersArray) {
      const { name, dob, position, initials, nation } = player;

      const query =
        "INSERT INTO players (name, dateofbirth, position, initials, nation) VALUES ($1, $2, $3, $4, $5)";
      const values = [name, dob, position, initials, nation];

      await pool.query(query, values);
    }
  } catch (error) {
    console.error("Error inserting players:", error);
  }
};
const insertAllCareerEntries = async () => {
  try {
    const careerEntriesArray = await readCareerEntries();

    for (const careerEntry of careerEntriesArray) {
      const { player_id, squad_number, club_id, season_id, image_url } =
        careerEntry;

      const query =
        "INSERT INTO career_entries (player_id, squad_number, club_id, season_id, image_url) VALUES ($1, $2, $3, $4, $5)";
      const values = [player_id, squad_number, club_id, season_id, image_url];

      await pool.query(query, values);
    }
  } catch (error) {
    console.error("Error inserting career entries:", error);
  }
};

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

(async () => {
  try {
    await seedData();
    await insertAllSeasons();
    await insertAllClubs();
    await insertAllPlayers();
    await insertAllCareerEntries();
  } catch (error) {
    console.error("Error in main block:", error);
  }
})();

module.exports = pool;
