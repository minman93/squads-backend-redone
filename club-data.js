const fs = require("fs");
const csv = require("csv-parser");
const clubsFilePath = "./club-data.csv";

const clubs = async (clubsFilePath) => {
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

module.exports = clubs;
