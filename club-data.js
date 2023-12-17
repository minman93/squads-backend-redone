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

// Use an async function to directly await the promise
const readClubs = async () => {
  try {
    const clubs = await readClubsFromCSV();
    console.log(clubs); // Now you have the clubs array here
    return clubs;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Call the async function
readClubs();

// If you want to use the clubs array in another file, you can export it
module.exports = readClubs;
console.log(readClubs);