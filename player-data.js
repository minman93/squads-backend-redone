const fs = require("fs");
const csv = require("csv-parser");
const playersFilePath = "./club-data.csv";

const readClubsFromCSV = () => {
  return new Promise((resolve, reject) => {
    const clubs = [];
    fs.createReadStream(playersFilePath)
      .pipe(csv())
      .on("data", (row) => {
        clubs.push(row);
      })
      .on("end", () => {
        resolve(clubs);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const readPlayers = async () => {
  try {
    const clubs = await readPlayersFromCSV();
    return clubs;
  } catch (error) {
    console.error(error);
    return [];
  }
};

readPlayers();

module.exports = readPlayers;
