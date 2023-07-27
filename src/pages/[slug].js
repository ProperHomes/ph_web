import { useApollo } from "@/utils/hooks/useApollo";

import { GET_PROPERTIES } from "@/containers/Properties/graphql";

import RentalAgreement from "@/containers/RentalAgreement";
import RentRecieptGenerator from "@/containers/RentRecieptGenerator";
import PropertyList from "@/containers/Properties/List";

import { ALL_CITIES, PROPERTY_TYPE } from "@/utils/constants";
import SellOrRentYourProperty from "@/containers/Properties/SellRentProperty";

const navlinks = [
  "flats-for-sale-and-rent",
  "villas-for-sale-and-rent",
  "independent-houses-for-sale-and-rent",
  "farm-houses-for-sale-and-rent",
  "commercial-properties-for-sale-and-rent",
  "pent-houses-for-sale-and-rent",
];

function Page({
  city,
  isForRent,
  propertiesList,
  isSellOrRentPage,
  isRentalAgreementPage,
}) {
  return (
    <>
      {propertiesList ? (
        <PropertyList data={propertiesList} />
      ) : isRentalAgreementPage ? (
        <RentalAgreement city={city} />
      ) : isSellOrRentPage ? (
        <SellOrRentYourProperty isForRent={isForRent} />
      ) : (
        <RentRecieptGenerator />
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

  const isSellOrRentPage =
    slug === "sell-your-property" || slug === "rent-your-property";

  if (navlinks.includes(slug)) {
    let propertiesList;
    let propertyType = slug.split("-for-sale-and-rent")[0];
    propertyType = propertyType.split("-").join("_").slice(0, -1).toUpperCase();
    propertyType = PROPERTY_TYPE[propertyType];
    try {
      const res = await client.query({
        query: GET_PROPERTIES,
        variables: { type: propertyType, first: 20, offset: 0 },
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
  } else if (isSellOrRentPage) {
    const isForRent = slug.split("-")[0] === "rent";
    return {
      props: {
        isForRent,
        isSellOrRentPage,
      },
    };
  }
}

export async function getStaticPaths() {
  let paths = [{ params: { slug: "rental-agreement" } }];
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
