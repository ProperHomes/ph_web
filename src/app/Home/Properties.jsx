"use client";
import { useQuery } from "@apollo/client";

import { GET_PROPERTIES_LOGGED_IN } from "@/graphql/properties";
import { useAppContext } from "src/appContext";
import PropertyList from "src/app/property/List";


export default function HomePageProperties({ data }) {
  const { state } = useAppContext();
  const loggedInUserId = state.user?.id;
  const { data: properties } = useQuery(GET_PROPERTIES_LOGGED_IN, {
    variables: {
      userId: loggedInUserId,
      first: 10,
      orderBy: ["CREATED_AT_DESC"],
    },
    skip: !loggedInUserId,
  });
  const list =
    (!!loggedInUserId
      ? properties?.properties?.edges?.map((edge) => edge.node) ?? data ?? []
      : data) ?? [];

  return (
    <>
      <PropertyList
        data={list}
        showSkeleton={list.length === 0}
        viewMoreLink="/new-properties-for-sale-rent-lease"
        title="Recently Added Properties"
      />
    </>
  );
}
