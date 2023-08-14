'use client';
import { initializeApollo } from "@/graphql/apolloClient";

export function useApollo(ctx) {
  return initializeApollo(ctx);
}
