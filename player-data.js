const fs = require("fs");
const csv = require("csv-parser");
const playersFilePath = "./player-data.csv";

const readPlayersFromCSV = () => {
  return new Promise((resolve, reject) => {
    const players = [];
    fs.createReadStream(playersFilePath)
      .pipe(csv())
      .on("data", (row) => {
        players.push(row);
      })
      .on("end", () => {
        resolve(players);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const readPlayers = async () => {
  try {
    const players = await readPlayersFromCSV();
    return players;
  } catch (error) {
    console.error(error);
    return [];
  }
};

readPlayers();

module.exports = readPlayers;


