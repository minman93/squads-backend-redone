const { GraphQLSchema, GraphQLObjectType, GraphQLBoolean } = require("graphql");

const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {},
});

const rootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    clubs: {
      type: GraphQLBoolean,
      resolve: () => {
        return true;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
