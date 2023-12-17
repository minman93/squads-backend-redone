const { fetchSeasons } = require("./model");

exports.getWelcomeMessage = (request, response, next) => {
  response.status(200).send({ message: "Hello World!" });
  console.log(message);
};

exports.getSeasons = (request, response, next) => {
  fetchSeasons().then((seasonsArray) => {
    response.status(200).send({ seasons: seasonsArray });
  });
};
