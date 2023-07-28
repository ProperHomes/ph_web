import { useApollo } from "@/utils/hooks/useApollo";
import {
  GET_ALL_PROPERTIES_FOR_STATIC_PATHS,
  GET_PROPERTY_BY_NUMBER,
} from "src/containers/Properties/graphql";
import Profile from "@/containers/Properties/Profile";

function Page({ profileData }) {
  return (
    <>
      <Profile data={profileData} />;
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  let profileData = null;
  try {
    const client = useApollo(context);
    const { data } = await client.query({
      query: GET_PROPERTY_BY_NUMBER,
      variables: { number: Number(params.number) },
      fetchPolicy: "network-only",
    });
    profileData = data?.propertyByNumber;
  } catch (err) {
    console.error("Error fetching property data: ", err);
  }
  if (!profileData) {
    return { notFound: true };
  }
  return {
    props: {
      profileData,
    },
  };
}

export async function getStaticPaths() {
  const client = useApollo();
  let paths = [];
  try {
    const { data } = await client.query({
      query: GET_ALL_PROPERTIES_FOR_STATIC_PATHS,
      fetchPolicy: "network-only",
    });
    const properties = data?.properties?.nodes ?? [];
    if (properties.length > 0) {
      paths = properties.map(({ slug, number }) => {
        return {
          params: { number: `${number}`, slug },
        };
      });
    }
  } catch (err) {
    console.log("err", err);
  }
  return { paths, fallback: true };
}

export default Page;
