const data = require("../test-data/index.js");
const seed = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
  return seed(data).then(() => db.end());
};

runSeed();
