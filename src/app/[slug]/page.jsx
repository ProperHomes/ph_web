import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { client } from "@/graphql/serverClient";
import { GET_PROPERTIES } from "@/graphql/properties";
import Home from "../Home/index";
import PropertyList from "src/app/property/List";
import {
  PROPERTY_TYPE,
  navlinks,
  navLinkWithCities,
  LISTING_TYPE,
  ALL_CITIES,
  HOME_SERVICES_LINKS,
} from "@/utils/constants";
import CategoryBoxes from "@/components/CategoryBoxes";
import { capitalizeFirstLetter } from "@/utils/helper";
import HomeServices from "../homeServices";
import RentalAgreement from "../create-rental-agreement";

export async function generateMetadata({ params }) {
  const { slug = "" } = params;
  const navLink = navlinks.find((l) => l.link === slug);
  const navLinkWithCity = navLinkWithCities.find((l) => l.link === slug);
  const isCityLink = navLinkWithCity?.link === slug;
  const isCitySlug = ALL_CITIES.includes(slug.toUpperCase());
  const isPG = slug.includes("pg") || slug.includes("paying-guests");
  const isHostel = slug.includes("hostel");

  let propertyType = null;
  if (isCitySlug) {
    propertyType = slug.split("-for-")[0];
    propertyType = propertyType.split("-").join("_").slice(0, -1).toUpperCase();
    if (slug.includes("commercial")) {
      propertyType = "Commercial Propertie";
    }
    if (slug.includes("farm")) {
      propertyType = PROPERTY_TYPE.FARM_HOUSE;
    }

    if (isPG) {
      propertyType = PROPERTY_TYPE.PG;
    }
    if (isHostel) {
      propertyType = PROPERTY_TYPE.HOSTEL;
    }
  }

  let title =
    "ProperHomes - Find Properties for Sale & Rent in India. List Property, Manage Rentals and more.";
  let description = `Find Proper Homes, Flats, Commercial Properties for Sale, Rent, Lease! List property, Manage rentals and more at ProperHomes. Real Estate in India.`;
  if (isCityLink) {
    const { title: cityLinkTitle, city } = navLinkWithCity;
    title = `${cityLinkTitle} | ProperHomes`;
    description = isPG
      ? `Find Paying Guest Accomodation in ${city}. Find Properties for PG in ${city}. PG ready properties in ${city}`
      : `${
          propertyType ? `${capitalizeFirstLetter(propertyType)}s` : "Flats"
        } for sale, rent in ${city}. Search Properties for Sale, Rent in ${city}. Find Residential Properties and New Projects in ${city} `;
  } else if (isCitySlug) {
    const slugCity = capitalizeFirstLetter(slug);
    title = `Properties for sale, rent in ${slugCity} | ProperHomes`;
    description = `Properties for sale, rent in ${slugCity}. Search Properties for Sale, Rent in ${slugCity}. Find Residential Properties and New Projects in ${slugCity} `;
  } else {
    title = navLink?.title
      ? `${navLink.title} | ProperHomes`
      : "ProperHomes - Find Properties for Sale & Rent in India. List Property, Manage Rentals and more.";
    description = isPG
      ? `Find Paying Guest Accomodation. Find Properties available for PG. PG ready properties.`
      : navLink && propertyType
      ? `${capitalizeFirstLetter(
          propertyType
        )}s for Sale, Rent! Search Properties for Sale, Rent in India. ProperHomes`
      : `Find Proper Homes, Flats, Commercial Properties for Sale, Rent, Lease! List property, Manage rentals and more at ProperHomes. Real Estate in India.`;
  }

  return {
    title,
    description,
    metadataBase: new URL("https://www.properhomes.in"),
    openGraph: {
      title,
      description,
      siteName: "ProperHomes",
      url: "https://www.properhomes.in",
      type: "website",
      images: "/logo.png",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@ProperHomes",
      images: ["/logo.png"],
    },
  };
}

async function getDefaultProperties() {
  const res = await client.request(GET_PROPERTIES, {
    first: 20,
    orderBy: ["CREATED_AT_DESC"],
  });
  return res?.properties?.edges?.map((edge) => edge.node) ?? [];
}

export default async function Page({ params, searchParams }) {
  const { slug = "" } = params;
  let data = [];
  const navLink = navlinks.find((l) => l.link === slug);
  const navLinkWithCity = navLinkWithCities.find((l) => l.link === slug);
  const isCityLink =
    navLinkWithCity?.link === slug || ALL_CITIES.includes(slug);
  const isCitySlug = ALL_CITIES.includes(slug.toUpperCase());
  const isHomServiceLink = HOME_SERVICES_LINKS.map((h) => h.path).includes(
    slug
  );

  const isRentalAgreement = slug.includes("create-rental-agreement");
  if (isRentalAgreement) {
    return <RentalAgreement />;
  }

  if (isCitySlug) {
    const citySlug = slug.toUpperCase();
    const variables = {
      first: 20,
      city: citySlug,
      orderBy: ["CREATED_AT_DESC"],
    };
    let res = await client.request(GET_PROPERTIES, variables);
    data = res?.properties?.edges?.map((edge) => edge.node) ?? [];
    if (data.length === 0) {
      data = getDefaultProperties();
    }
    return (
      <Stack spacing={4} py={2}>
        <PropertyList
          data={data}
          infiniteScroll
          city={citySlug}
          count={20}
          searchParams={searchParams}
          title={`Explore Properties in ${capitalizeFirstLetter(citySlug)}`}
          showFilters
        />
      </Stack>
    );
  }

  if (isHomServiceLink) {
    return <HomeServices />;
  }

  if ((navLink?.link === slug || isCityLink) && !isCitySlug) {
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
      slug.includes("properties-for-rent") ||
      slug.includes("properties-for-lease");

    const variables = {
      first: isProperties ? 20 : 10,
      orderBy: ["CREATED_AT_DESC"],
    };

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
      data = getDefaultProperties();
    }
    return (
      <Stack spacing={4} py={2}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <CategoryBoxes />
        </Box>
        <PropertyList
          data={data}
          type={variables.type}
          infiniteScroll
          listedFor={listedFor}
          city={city}
          searchParams={searchParams}
          count={isProperties ? 20 : 10}
          title={isCityLink ? navLinkWithCity.title : navLink.title}
          showFilters
        />
      </Stack>
    );
  } else {
    return <Home />;
  }
}

export function generateStaticParams() {
  const paths = ["create-rental-agreement"];
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
  for (let city of ALL_CITIES) {
    paths.push({
      slug: city.toLowerCase(),
    });
  }
  for (let homeService of HOME_SERVICES_LINKS) {
    paths.push({
      slug: homeService.path.toLowerCase(),
    });
  }
  for (let city of ALL_CITIES) {
    paths.push({
      slug: `create-rental-agreement-in-${city.toLowerCase()}`,
    });
  }
  return paths;
}
