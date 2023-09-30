import { gql, request, GraphQLClient } from "graphql-request";
import { Config } from "sst/node/config";

console.log(Config);
const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API, {
  fetch, // Need to pass fetch here because of Next.js cache
  headers: {
    authorization: `Bearer ${Config.API_SECRET}`,
  },
  // cache: 'force-cache',
});

export { gql, request, client };
