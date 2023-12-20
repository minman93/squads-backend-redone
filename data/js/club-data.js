const fs = require("fs");
const csv = require("csv-parser");
const clubsFilePath = "./club-data.csv";

const readClubsFromCSV = () => {
  return new Promise((resolve, reject) => {
    const clubs = [];
    fs.createReadStream(clubsFilePath)
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

const readClubs = async () => {
  try {
    const clubs = await readClubsFromCSV();
    return clubs;
  } catch (error) {
    console.error(error);
    return [];
  }
};

readClubs();

module.exports = readClubs;
