import { gql } from "graphql-request";
import Profile from "../profile";
import graphqlServerClient from "@/utils/graphql";

const PROPERTY_FIELDS = gql`
  fragment PropertyFields on Property {
    id
    number
    type
    slug
    title
    city
    price
    listedFor
    isFurnished
    hasSwimmingPool
    hasParking
    hasBasement
    description
    country
    condition
    bedrooms
    bathrooms
    attributes
    createdAt
    area
    ownerId
    agentId
  }
`;

const GET_PROPERTY_BY_SLUG = gql`
  ${PROPERTY_FIELDS}
  query PropertyBySlug($slug: String!) {
    propertyBySlug(slug: $slug) {
      ...PropertyFields
      media: propertyMedias {
        nodes {
          id
          mediaUrl
          media {
            signedUrl
          }
          isCoverImage
        }
      }
    }
  }
`;

const GET_ALL_PROPERTIES_FOR_STATIC_PATHS = gql`
  query getPropertiesForStaticPaths {
    properties {
      nodes {
        number
        slug
      }
    }
  }
`;

export default async function Page({ params }) {
  const res = await graphqlServerClient.request(GET_PROPERTY_BY_SLUG, {
    slug: params.slug,
  });
  const data = res?.propertyBySlug;
  return (
    <>
      <Profile data={data} />
    </>
  );
}

export async function generateStaticParams() {
  const res = await graphqlServerClient.request(
    GET_ALL_PROPERTIES_FOR_STATIC_PATHS
  );
  const properties = res?.data?.properties?.nodes ?? [];
  return properties.map(({ slug }) => {
    return { slug };
  });
}
