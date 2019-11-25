const models = require('./models/index.model');
const resolvers = require('./resolvers');
const gqlLoader = require('./utils/gqlLoader');

module.exports = {
  typeDefs: [gqlLoader('types.graphql'), gqlLoader('app.graphql')],
  resolvers,
  context: req => ({
    ...req,
    models: {
      ...models,
    },
  }),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
};
