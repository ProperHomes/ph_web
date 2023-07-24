import { useApollo } from "@/utils/hooks/useApollo";
import { getPropertyUrl } from "@/utils/helper";
import {
  GET_PROPERTY_BY_SLUG,
  GET_ALL_PROPERTIES_FOR_STATIC_PATHS,
} from "src/containers/Properties/graphql";
import Profile from "@/containers/Properties/Profile";

function Page({ profileData }) {
  return <Profile data={profileData} />;
}

export async function getStaticProps(context) {
  const { params } = context;
  let profileData = null;
  try {
    const client = useApollo(context);
    const res = await client.query({
      query: GET_PROPERTY_BY_SLUG,
      variables: { slug: params.slug },
      fetchPolicy: "network-only",
    });

    profileData = res?.data?.properties?.nodes[0];
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
    const jobs = data?.jobs?.nodes ?? [];
    if (jobs.length > 0) {
      paths = jobs.map(({ city, type, listedFor }) => {
        return {
          params: { slug: getPropertyUrl({ city, type, listedFor }) },
        };
      });
    }
  } catch (err) {
    console.log("err", err);
  }
  return { paths, fallback: true };
}

export default Page;
