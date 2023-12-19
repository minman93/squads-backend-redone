const fs = require("fs");
const csv = require("csv-parser");
const playersFilePath = "./player-data.csv";

const readPlayersFromCSV = () => {
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
    const players = await readPlayersFromCSV();
    console.log(players);
    return players;
  } catch (error) {
    console.error(error);
    return [];
  }
};

readPlayers();

module.exports = readPlayers;


