const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const { PORT = 9090 } = process.env;

const QueryRoot = new graphql.GraphQLObjectType({
  name: "Query",
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Hello world!",
    },
  }),
});

const schema = new graphql.GraphQLSchema({ query: QueryRoot });

const app = express();
app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
