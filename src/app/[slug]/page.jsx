import Stack from "@mui/material/Stack";
import { client } from "@/graphql/serverClient";
import { GET_PROPERTIES } from "@/graphql/properties";
import Home from "../Home";
import RentalAgreement from "src/app/createRentalAgreement";
import RentRecieptGenerator from "src/app/rentRecieptGenerator";
import PropertyList from "src/app/property/List";
import {
  ALL_CITIES,
  PROPERTY_TYPE,
  navlinks,
  navLinkWithCities,
  LISTING_TYPE,
} from "@/utils/constants";
import CreateProperty from "src/app/createProperty";
import CategoryBoxes from "@/components/CategoryBoxes";

export default async function Page({ params }) {
  const { slug = "" } = params;
  let data = [];

  const isRentalAgreementPage = slug.includes("create-rental-agreement");
  const isListPropertyPage = slug === "list-your-property-for-sale-rent-lease";

  const navLink = navlinks.find((l) => l.link === slug);
  const navLinkWithCity = navLinkWithCities.find((l) => l.link === slug);
  const isCityLink = navLinkWithCity?.link === slug;

  if (navLink?.link === slug || isCityLink) {
    let listedFor = null;
    let city = null;
    if (isCityLink) {
      listedFor = slug.split("-in-")[0];
      city = slug.split("-in-").pop().toUpperCase();
    }
    listedFor = (isCityLink ? listedFor : slug).split("-").pop().toUpperCase();
    let propertyType = slug.split("-for-")[0];
    propertyType = propertyType.split("-").join("_").slice(0, -1).toUpperCase();

    const isPG = slug.includes("pg") || slug.includes("paying-guests");
    const isHostel = slug.includes("hostel");

    const isProperties =
      slug.includes("properties-for-sale") ||
      slug.includes("properties-for-rent");

    const variables = { first: isProperties ? 20 : 10 };

    if (!isProperties) {
      variables.type = propertyType;
    }
    if (slug.includes("commercial")) {
      variables.type = PROPERTY_TYPE.COMMERCIAL;
    }
    if (isPG) {
      variables.type = PROPERTY_TYPE.PG;
    }
    if (isHostel) {
      variables.type = PROPERTY_TYPE.HOSTEL;
    }

    listedFor = isPG || isHostel ? LISTING_TYPE.RENT : listedFor;
    variables.listedFor = listedFor;

    if (city && isCityLink) {
      variables.city = city;
    }

    let res = await client.request(GET_PROPERTIES, variables);
    data = res?.properties?.edges?.map((edge) => edge.node) ?? [];
    if (data.length === 0) {
      res = await client.request(GET_PROPERTIES, {
        first: isProperties ? 20 : 10,
      });
      data = res?.properties?.edges?.map((edge) => edge.node) ?? [];
    }
    return (
      <Stack spacing={4} py={2}>
        <CategoryBoxes />
        <PropertyList
          data={data}
          type={variables.type}
          infiniteScroll={isProperties}
          showPagination={!isProperties}
          listedFor={listedFor}
          city={city}
          count={!isProperties ? 20 : 10}
          title={isCityLink ? navLinkWithCity.title : navLink.title}
          showFilters
        />
      </Stack>
    );
  } else if (isRentalAgreementPage) {
    const rentalAgreementCity =
      slug === "create-rental-agreement" ? "" : slug.split("-").pop();
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
    { slug: "create-rental-agreement" },
    { slug: "online-rent-reciept-generator-free" },
    { slug: "rent-reciept-generator-online" },
    { slug: "list-your-property-for-sale-rent-lease" },
  ];
  for (let city of ALL_CITIES) {
    paths.push({
      slug: `create-rental-agreement-in-${city.toLowerCase()}`,
    });
  }
  for (let link of navlinks) {
    paths.push({
      slug: link.link,
    });
  }
  for (let link of navLinkWithCities) {
    paths.push({
      slug: link.link,
    });
  }
  return paths;
}
