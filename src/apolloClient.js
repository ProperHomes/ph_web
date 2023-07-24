import { ApolloClient, InMemoryCache, split, from } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { createUploadLink } from "apollo-upload-client";

let SSRApolloClient;
let nonSSRApolloClient;

const isSSR = typeof window === "undefined";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: process.env.NEXT_PUBLIC_GRAPHQL_SUBSCRIPTIONS,
        })
      )
    : null;

const splitLink = (ctx) => {
  const httpLinkOptions = {
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
    credentials: isSSR || !!ctx ? "same-origin" : "include",
  };
  if (isSSR) {
    httpLinkOptions.headers = {
      ...(ctx?.req?.headers ?? {}),
    };
  }
  if (wsLink != null) {
    return split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      createUploadLink(httpLinkOptions)
    );
  } else {
    return createUploadLink(httpLinkOptions);
  }
};

function createApolloClient(ctx) {
  return new ApolloClient({
    ssrMode: !!ctx || isSSR,
    link: from([errorLink, splitLink(ctx)]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(ctx) {
  let _apolloClient = ctx ? SSRApolloClient : nonSSRApolloClient;
  // For SSG and SSR always create a new Apollo Client
  if (!_apolloClient) {
    _apolloClient = createApolloClient(ctx);
    if (ctx) {
      SSRApolloClient = _apolloClient;
    } else {
      nonSSRApolloClient = _apolloClient;
    }
  }
  return _apolloClient;
}
