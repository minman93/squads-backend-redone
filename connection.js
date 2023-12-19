const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
const seasons = require("./season-data");
const readClubs = require("./club-data");
const readPlayers = require("./player-data");

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

  await pool.query(dropSeasons);
  await pool.query(dropClubs);
  await pool.query(createSeasons);
  await pool.query(createClubs);
};

class Season {
  constructor(season) {
    this.season = season;
  }

  static async insertAllSeasons() {
    for (const season of seasons) {
      const query = "INSERT INTO seasons (name) VALUES ($1)";
      const values = [season];

      try {
        await pool.query(query, values);
        console.log(`Inserted season: ${season}`);
      } catch (error) {
        console.error("Error inserting season:", error);
      }
    }

    console.log("All seasons inserted successfully");
  }
}
class Club {
  constructor(name, badge, pc, sc) {
    this.name = name;
    this.badge = badge;
    this.primaryColour = pc;
    this.secondaryColour = sc;
  }

  static async insertAllClubs() {
    try {
      const clubsArray = await readClubs();

      for (const club of clubsArray) {
        const { name, badge, primary_colour, secondary_colour } = club;

        const query =
          "INSERT INTO clubs (name, badge, primary_colour, secondary_colour) VALUES ($1, $2, $3, $4)";
        const values = [name, badge, primary_colour, secondary_colour];

        await pool.query(query, values);
        console.log(`Inserted club: ${name}`);
      }

      console.log("All clubs inserted successfully");
    } catch (error) {
      console.error("Error inserting clubs:", error);
    }
  }
}
class Player {
  constructor(name, dob, position, initials, nation) {
    this.name = name;
    this.dob = dob;
    this.position = position;
    this.initials = initials;
    this.nation = nation;
  }

  static async insertAllPlayers() {
    try {
      const playersArray = await readPlayers();

      for (const player of playersArray) {
        const { name, dob, position, initials, nation } = player;

        const query =
          "INSERT INTO players (name, dob, position, initials, nation) VALUES ($1, $2, $3, $4, $5)";
        const values = [name, dob, position, initials, nation];

        await pool.query(query, values);
        console.log(`Inserted player: ${name}`);
      }

      console.log("All players inserted successfully");
    } catch (error) {
      console.error("Error inserting players:", error);
    }
  }
}

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}
(async () => {
  try {
    await seedData();
    await Season.insertAllSeasons();
    await Club.insertAllClubs();
    await Player.insertAllPlayers();
  } catch (error) {
    console.error("Error in main block:", error);
  }
})();

module.exports = pool;
