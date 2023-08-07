import Home from "../Home";
import RentalAgreement from "src/app/rentalAgreement";
import RentRecieptGenerator from "src/app/rentRecieptGenerator";
import PropertyList from "src/app/property/List";
import { ALL_CITIES, PROPERTY_TYPE } from "@/utils/constants";
import CreateProperty from "src/app/createProperty";

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
  { link: "flats-for-sale", title: "Flats For Sale" },
  { link: "villas-for-sale", title: "Villas For Sale" },
  { link: "houses-for-sale", title: "Independent Houses For Sale" },
  { link: "farm-houses-for-sale", title: "Farm Houses For Sale" },
  {
    link: "commercial-properties-for-sale",
    title: "Commerical Properties For Sale",
  },
  { link: "pent-houses-for-sale", title: "Pent Houses For Sale" },
  { link: "properties-for-sale", title: "Properties For Sale" },
  // RENTS FROM NOW
  { link: "flats-for-rent", title: "Flats For Rent" },
  { link: "villas-for-rent", title: "Villas For Rent" },
  { link: "houses-for-rent", title: "Independent Houses For Rent" },
  { link: "farm-houses-for-rent", title: "Farm Houses For Rent" },
  {
    link: "commercial-properties-for-rent",
    title: "Commerical Properties For Rent",
  },
  { link: "pent-houses-for-rent", title: "Pent Houses For Rent" },
  { link: "properties-for-rent", title: "Properties For Rent" },
];

export default async function Page({ params }) {
  const { slug = "" } = params;
  let data = [];
  const isRentalAgreementPage =
    slug === "rental-agreement" ||
    slug?.split("-").slice(0, 3).join("-") === "rental-agreement-in";
  const isListPropertyPage = slug === "list-your-property-for-sale-rent-lease";
  const navLink = navlinks.find((l) => l.link === slug);
  if (navLink?.link === slug) {
    const listedFor = slug.split("-").pop().toUpperCase();
    let propertyType = slug.split("-for-")[0];
    propertyType = propertyType.split("-").join("_").slice(0, -1).toUpperCase();
    const variables = { listedFor, first: 20, offset: 0 };
    if (slug !== "properties-for-sale" && slug !== "properties-for-rent") {
      variables.type = propertyType;
    }
    if (slug.includes("commercial-properties")) {
      variables.type = PROPERTY_TYPE.COMMERCIAL;
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
    if (data.length === 0) {
      res = await fetch({
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
      data = res?.data?.properties?.nodes ?? [];
    }
    return <PropertyList data={data} title={navLink.title} />;
  } else if (isRentalAgreementPage) {
    const rentalAgreementCity =
      slug === "rental-agreement" ? "" : slug.split("-").pop();
    return <RentalAgreement city={rentalAgreementCity} />;
  } else if (
    slug === "online-rent-reciept-generator-free" ||
    slug === "rent-reciept-generator-online"
  ) {
    return <RentRecieptGenerator />;
  } else if (isListPropertyPage) {
    return <CreateProperty />;
  } else {
    return <Home data={data} />;
  }
}

export function generateStaticParams() {
  let paths = [
    { slug: "rental-agreement" },
    { slug: "online-rent-reciept-generator-free" },
    { slug: "rent-reciept-generator-online" },
    { slug: "list-your-property-for-sale-rent-lease" },
  ];
  for (let city of ALL_CITIES) {
    paths.push({
      slug: `rental-agreement-in-${city.toLowerCase()}`,
    });
  }
  for (let link of navlinks) {
    paths.push({
      slug: link.link,
    });
  }
  return paths;
}
