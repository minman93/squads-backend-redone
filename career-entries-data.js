const fs = require("fs");
const csv = require("csv-parser");
const careerEntriesFilePath = "./career-entries-data.csv";

const readCareerEntriesFromCSV = () => {
  return new Promise((resolve, reject) => {
    const players = [];
    fs.createReadStream(careerEntriesFilePath)
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

const readCareerEntries = async () => {
  try {
    const careerEntries = await readCareerEntriesFromCSV();
    return careerEntries;
  } catch (error) {
    console.error(error);
    return [];
  }
};

readCareerEntries();

module.exports = readCareerEntries;
