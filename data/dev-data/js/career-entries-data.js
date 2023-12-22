const fs = require("fs");
const csv = require("csv-parser");
const careerEntriesFilePath = "../csv/career-entries-data.csv";

const readCareerEntriesFromCSV = () => {
  return new Promise((resolve, reject) => {
    const careerEntries = [];
    fs.createReadStream(careerEntriesFilePath)
      .pipe(csv())
      .on("data", (row) => {
        careerEntries.push(row);
      })
      .on("end", () => {
        resolve(careerEntries);
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
