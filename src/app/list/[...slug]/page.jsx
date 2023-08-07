import PropertyList from "src/app/property/List";
import { ALL_CITIES, PROPERTY_TYPE } from "@/utils/constants";

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

const navlinks = [
  "flats-for-sale",
  "villas-for-sale",
  "houses-for-sale",
  "cabins-for-sale",
  "lots-for-sale",
  "farm-houses-for-sale",
  "commercial-properties-for-sale",
  "pent-houses-for-sale",
  "properties-for-sale",
  // RENTS FROM NOW
  "flats-for-rent",
  "villas-for-rent",
  "houses-for-rent",
  "farm-houses-for-rent",
  "commercial-properties-for-rent",
  "pent-houses-for-rent",
  "properties-for-rent",
  "cabins-for-rent",
  "lots-for-lease",
];

export default async function Page({ params }) {
  const { slug } = params;
  let data = [];
  const link = slug[0];
  const city = slug[1];
  const listedFor = link.split("-").pop().toUpperCase();
  let propertyType = link.split("-for-")[0];
  propertyType = propertyType.split("-").join("_").slice(0, -1).toUpperCase();
  const variables = { listedFor, first: 20, offset: 0 };
  if (link !== "properties-for-sale" && link !== "properties-for-rent") {
    variables.type = propertyType;
  }
  if (link.includes("commercial-properties")) {
    variables.type = PROPERTY_TYPE.COMMERCIAL;
  }
  if (city) {
    variables.city = decodeURIComponent(city.toUpperCase());
  }
  let res = await fetch({
    method: "POST",
    url: process.env.NEXT_PUBLIC_GRAPHQL_API,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_PROPERTIES,
      variables,
    }),
  });
  res = await res.json();
  data = res?.data?.properties?.nodes ?? [];
  return <PropertyList data={data} />;
}

export async function generateStaticParams() {
  let paths = [];
  for (let link of navlinks) {
    paths.push({
      slug: [link],
    });
  }
  for (let link of navlinks) {
    for (let city of ALL_CITIES) {
      paths.push({
        slug: [link, city],
      });
    }
  }
  return paths;
}
