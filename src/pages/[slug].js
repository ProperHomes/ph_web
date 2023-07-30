import { useApollo } from "@/utils/hooks/useApollo";

import { GET_PROPERTIES } from "@/containers/Properties/graphql";

import Home from "@/containers/Home";
import RentalAgreement from "@/containers/RentalAgreement";
import RentRecieptGenerator from "@/containers/RentRecieptGenerator";
import PropertyList from "@/containers/Properties/List";

import { ALL_CITIES, PROPERTY_TYPE } from "@/utils/constants";
import CreateProperty from "@/containers/Properties/Create";

const navlinks = [
  "flats-for-sale",
  "villas-for-sale",
  "houses-for-sale",
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
];

function Page({
  city,
  propertiesList,
  isListPropertyPage,
  isRentalAgreementPage,
  rentReceiptGenerator,
}) {
  return (
    <>
      {propertiesList ? (
        <PropertyList data={propertiesList} />
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

  if (navlinks.includes(slug)) {
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
  ];
  for (let city of ALL_CITIES) {
    paths.push({
      params: { slug: `rental-agreement-in-${city.toLowerCase()}` },
    });
  }
  for (let link of navlinks) {
    paths.push({
      params: { slug: link },
    });
  }
  return { paths, fallback: true };
}

export default Page;
