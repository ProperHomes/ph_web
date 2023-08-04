import { useApollo } from "@/utils/hooks/useApollo";

import { GET_PROPERTIES } from "@/containers/Properties/graphql";

import Home from "@/containers/Home";
import RentalAgreement from "@/containers/RentalAgreement";
import RentRecieptGenerator from "@/containers/RentRecieptGenerator";
import PropertyList from "@/containers/Properties/List";

import { ALL_CITIES, PROPERTY_TYPE } from "@/utils/constants";
import CreateProperty from "@/containers/Properties/Create";

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

function Page({
  city,
  propertiesList,
  title,
  isListPropertyPage,
  isRentalAgreementPage,
  rentReceiptGenerator,
}) {
  return (
    <>
      {propertiesList ? (
        <PropertyList data={propertiesList} title={title} />
      ) : isRentalAgreementPage ? (
        <RentalAgreement city={city} />
      ) : isListPropertyPage ? (
        <CreateProperty />
      ) : rentReceiptGenerator ? (
        <RentRecieptGenerator />
      ) : (
        <Home />
      )}
    </>
  );
}

export async function getStaticProps(context) {
  const client = useApollo(context);
  const { params } = context;
  const { slug } = params;

  const isRentalAgreementPage =
    slug === "rental-agreement" ||
    slug.split("-").slice(0, 3).join("-") === "rental-agreement-in";

  const isListPropertyPage = slug === "list-your-property-for-sale-rent-lease";

  const navLink = navlinks.find((l) => l.link === slug);
  if (navLink?.link === slug) {
    let propertiesList;
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
    try {
      const res = await client.query({
        query: GET_PROPERTIES,
        variables,
        fetchPolicy: "network-only",
      });
      propertiesList = res?.data?.properties?.nodes ?? [];
      if (propertiesList.length === 0) {
        const res = await client.query({
          query: GET_PROPERTIES,
          variables: { first: 20, offset: 0 },
          fetchPolicy: "network-only",
        });
        propertiesList = res?.data?.properties?.nodes ?? [];
      }
    } catch (err) {
      console.error("Error fetching properties data: ", err);
    }

    if (!propertiesList) {
      return { notFound: true };
    }
    return {
      props: {
        propertiesList,
        title: navLink.title,
      },
    };
  } else if (isRentalAgreementPage) {
    const rentalAgreementCity =
      slug === "rental-agreement" ? "" : slug.split("-").pop();
    return {
      props: {
        isRentalAgreementPage,
        city: rentalAgreementCity,
      },
    };
  } else if (
    slug === "online-rent-reciept-generator-free" ||
    slug === "rent-reciept-generator-online"
  ) {
    return {
      props: {
        rentReceiptGenerator: true,
      },
    };
  } else if (isListPropertyPage) {
    return {
      props: {
        isListPropertyPage,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  let paths = [
    { params: { slug: "rental-agreement" } },
    { params: { slug: "online-rent-reciept-generator-free" } },
    { params: { slug: "rent-reciept-generator-online" } },
    { params: { slug: "list-your-property-for-sale-rent-lease" } },
  ];
  for (let city of ALL_CITIES) {
    paths.push({
      params: { slug: `rental-agreement-in-${city.toLowerCase()}` },
    });
  }
  for (let link of navlinks) {
    paths.push({
      params: { slug: link.link },
    });
  }
  return { paths, fallback: true };
}

export default Page;
