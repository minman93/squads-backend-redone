const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require("graphql");

const QueryRoot = new graphql.GraphQLObjectType({
  name: "Query",
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Hello world!",
    },
  }),
});
