const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
const seasons = require("./season-data");
const clubs = require("./club-data");

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
    id SERIAL PRIMARY KEY, name VARCHAR(50), badge VARCHAR(100), primary_colour VARCHAR(10), secondary_colour VARCHAR(10)
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
    for (const club of clubs) {
      const query =
        "INSERT INTO clubs (name, badge, primary_colour, secondary_colour) VALUES ($1, $2, $3, $4)";
      const values = [
        club.name,
        club.badge,
        club.primaryColour,
        club.secondaryColour,
      ];
      try {
        await pool.query(query, values);
        console.log(`Inserted season: ${club}`);
      } catch (error) {
        console.error("Error inserting club:", error);
      }
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
  } catch (error) {
    console.error("Error in main block:", error);
  }
})();

module.exports = pool;
