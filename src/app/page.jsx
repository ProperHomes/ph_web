import Home from "./Home";

const GET_PROPERTIES = `
  query getProperties(
    $first: Int!
    $offset: Int!
    $listedFor: TypeOfListing
    $type: PropertyType
    $city: PropertyCity
  ) {
    properties(
      condition: { listedFor: $listedFor, type: $type, city: $city }
      first: $first
      offset: $offset
      orderBy: CREATED_AT_DESC
    ) {
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
  let res = await fetch({
    method: "POST",
    url: process.env.NEXT_PUBLIC_GRAPHQL_API,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_PROPERTIES,
      variables: { first: 20, offset: 0 },
    }),
  });
  res = await res.json();
  const data = res?.data?.properties?.nodes ?? [];
  return <Home data={data} />;
}
