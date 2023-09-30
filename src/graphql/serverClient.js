import { gql, request, GraphQLClient } from "graphql-request";
import { Config } from "sst/node/config";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API, {
  fetch, // Need to pass fetch here because of Next.js cache
  headers: {
    Authorization: `Bearer ${Config.API_SECRET}`,
  },
  // cache: 'force-cache',
});

export { gql, request, client };
