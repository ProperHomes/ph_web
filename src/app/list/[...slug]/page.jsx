import { gql, client } from "@/graphql/serverClient";
import PropertyList from "src/app/property/List";
import { ALL_CITIES, PROPERTY_TYPE } from "@/utils/constants";

const GET_PROPERTIES = gql`
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
  "bungalows-for-sale",
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
  "bungalows-for-rent",
  // Others
  "pg",
  "paying-guests-accommodation",
  "hostels",
  "hostel-accomodation",
];

export default async function Page({ params }) {
  const { slug } = params;
  let data = [];
  const variables = { first: 20, offset: 0 };

  const link = slug[0];
  const city = slug[1];
  const listedFor = link.split("-").pop().toUpperCase();
  let propertyType = link.split("-for-")[0];
  propertyType = propertyType.split("-").join("_").slice(0, -1).toUpperCase();

  const isPG = link.includes("pg") || link.includes("paying-guests");
  const isHostel = link.includes("hostel");

  if (link !== "properties-for-sale" && link !== "properties-for-rent") {
    variables.type = propertyType;
  }
  if (link.includes("commercial")) {
    variables.type = PROPERTY_TYPE.COMMERCIAL;
  }
  if (isPG) {
    variables.type = PROPERTY_TYPE.PG;
  }
  if (isHostel) {
    variables.type = PROPERTY_TYPE.HOSTEL;
  }

  if (!isPG && !isHostel) {
    variables.listedFor = listedFor;
  }

  if (city) {
    variables.city = decodeURIComponent(city.toUpperCase());
  }
  const res = await client.request(GET_PROPERTIES, variables);
  data = res?.properties?.nodes ?? [];
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
        slug: [link, city.toLowerCase()],
      });
    }
  }
  return paths;
}
