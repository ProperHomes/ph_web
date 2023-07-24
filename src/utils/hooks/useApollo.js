import { initializeApollo } from "src/apolloClient";

export function useApollo(ctx) {
  return initializeApollo(ctx);
}
