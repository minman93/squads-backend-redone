//Get Welcome Message

exports.getWelcomeMessage = (request, response, next) => {
  response.status(200).send({ message: "Hello World!" });
  console.log(message);
};
