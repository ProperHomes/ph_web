import { useApollo } from "@/utils/hooks/useApollo";
import { GET_PROPERTIES } from "src/containers/Properties/graphql";

import PropertyList from "@/containers/Properties/List";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { LISTING_TYPE, PROPERTY_TYPE } from "@/utils/constants";

function Page({ data }) {
  return (
    <HomeLayout>
      <PropertyList data={data} />;
    </HomeLayout>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  let data = null;
  try {
    const client = useApollo(context);
    const res = await client.query({
      query: GET_PROPERTIES,
      variables: {
        listedFor: LISTING_TYPE.RENT,
        type: PROPERTY_TYPE.LOT,
        first: 20,
        offset: 0,
      },
      fetchPolicy: "network-only",
    });
    data = res?.data?.properties.nodes ?? [];
  } catch (err) {
    console.error("Error fetching property data: ", err);
  }
  if (!data) {
    return { notFound: true };
  }
  return {
    props: {
      data,
    },
  };
}

export default Page;
