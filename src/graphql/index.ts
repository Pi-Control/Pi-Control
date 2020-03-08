import { join } from 'path';
import { mergeResolvers, mergeTypes, fileLoader } from 'merge-graphql-schemas';
import { buildSchema } from 'graphql';

const typeDefs = mergeTypes(
  fileLoader(join(__dirname, 'typeDefs/**/*.graphql'))
);
const resolvers = mergeResolvers(
  fileLoader(join(__dirname, 'resolvers/**/*.ts'))
);
const schema = buildSchema(typeDefs);

export { schema, typeDefs, resolvers };
