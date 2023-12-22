const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/./.env.test`,
});

const config =
  ENV === "production"
    ? { connectionString: process.env.DATABASE_URL, max: 2 }
    : {};
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}
let pool = new Pool(config);



module.exports = pool;
