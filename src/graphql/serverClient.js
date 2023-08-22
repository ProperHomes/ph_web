import { gql, request, GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API, {
  fetch, // Need to pass fetch here because of Next.js cache
  cache: 'force-cache',
});

export { gql, request, client };
