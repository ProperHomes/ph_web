import { gql, request, GraphQLClient } from "graphql-request";
import { Config } from "sst/node/config";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API, {
  fetch, // Need to pass fetch here because of Next.js cache
  headers: {
    // This secret will only help us get access to the ph_anon role on the backend db.
    authorization: Config.API_SECRET,
  },
  cache: "force-cache",
});

export { gql, request, client };
