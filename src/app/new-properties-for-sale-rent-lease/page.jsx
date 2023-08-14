import { gql, client } from "@/graphql/serverClient";
import PropertyList from "src/app/property/List";

const GET_PROPERTIES = gql`
  query getProperties($first: Int!, $offset: Int!) {
    properties(first: $first, offset: $offset, orderBy: CREATED_AT_DESC) {
      nodes {
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
  }
`;

export default async function Page() {
  const res = await client.request(GET_PROPERTIES, { first: 20, offset: 0 });
  const data = res?.properties?.nodes ?? [];
  return (
    <PropertyList
      showFilters
      data={data}
      infiniteScroll
      count={20}
      title="All Properties Listed in the last 24 hours"
    />
  );
}
