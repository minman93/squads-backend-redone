const fs = require("fs");
const csv = require("csv-parser");
const clubsFilePath = "./club-data.csv";

const readClubsFromCSV = async (clubsFilePath) => {
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

readClubsFromCSV(clubsFilePath)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = readClubsFromCSV;
