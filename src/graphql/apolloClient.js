"use client";
import { ApolloClient, InMemoryCache, split, from } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { createUploadLink } from "apollo-upload-client";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_SUBSCRIPTIONS,
  })
);

const splitLink = () => {
  const httpLinkOptions = {
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
    credentials: "include",
  };
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

export default new ApolloClient({
  link: from([errorLink, splitLink()]),
  cache: new InMemoryCache(),
});
