import Home from "@/containers/Home";
import { useApollo } from "@/utils/hooks/useApollo";
import { GET_PROPERTIES } from "@/containers/Properties/graphql";

function HomeMain({ data }) {
  return <Home data={data} />;
}

export async function getStaticProps(context) {
  let data = [];
  try {
    const client = useApollo(context);
    const res = await client.query({
      query: GET_PROPERTIES,
      variables: { first: 20, offset: 0 },
      fetchPolicy: "network-only",
    });
    data = res?.data?.properties?.nodes ?? [];
  } catch (err) {
    console.error("Error fetching property data: ", err);
  }
  return {
    props: {
      data,
    },
  };
}

export default HomeMain;
