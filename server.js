const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  user: "{YOUR_POSTGRES_USERNAME}",
  password: "{YOUR_POSTGRES_PASSWORD}",
  database: "{YOUR_POSTGRES_DATABASE}",
});
client.connect();

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
app.listen(3000);
