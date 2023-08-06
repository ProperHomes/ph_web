import { useApollo } from "@/utils/hooks/useApollo";

import { GET_PROPERTIES } from "@/containers/Properties/graphql";
import PropertyList from "@/containers/Properties/List";
import { PROPERTY_TYPE } from "@/utils/constants";

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

function Page({ data }) {
  return (
    <>
      <PropertyList data={data} />
    </>
  );
}

export async function getStaticProps(context) {
  const client = useApollo(context);
  const { params } = context;
  const { slug } = params;

  let data;

  if (slug && navlinks.includes(slug?.[0])) {
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

    try {
      const res = await client.query({
        query: GET_PROPERTIES,
        variables,
        fetchPolicy: "network-only",
      });
      data = res?.data?.properties?.nodes ?? [];
    } catch (err) {
      console.error("Error fetching properties data: ", err);
    }
    if (!data) {
      return { notFound: true };
    }
    return {
      props: {
        data,
      },
    };
  } else {
    const res = await client.query({
      query: GET_PROPERTIES,
      variables: { first: 20, offset: 0 },
      fetchPolicy: "network-only",
    });
    data = res?.data?.properties?.nodes ?? [];
    return {
      props: { data },
    };
  }
}

export async function getStaticPaths() {
  let paths = [];

  for (let link of navlinks) {
    paths.push({
      params: { slug: [link] },
    });
  }
  return { paths, fallback: true };
}

export default Page;
