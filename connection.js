const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
const seasons = require("./season-data");

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

  await pool.query(dropSeasons);

  await pool.query(createSeasons);
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

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}
(async () => {
  try {
    await seedData();
    await Season.insertAllSeasons();
  } catch (error) {
    console.error("Error in main block:", error);
  }
})();

module.exports = pool(config);
