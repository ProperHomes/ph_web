import 'server-only'

import { GraphQLClient } from "graphql-request";

const graphqlServerClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_API
);

export default graphqlServerClient;
