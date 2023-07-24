import HomeLayout from "@/components/Layouts/HomeLayout";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_PROPERTY_BY_SLUG } from "./graphql";

function PropertyProfile({ data }) {
  const router = useRouter();
  const { slug } = router.query;
  // const { data: propertyDataOnLoad } = useQuery(GET_PROPERTY_BY_SLUG, {
  //   variables: {
  //     slug,
  //   },
  //   fetchPolicy: "network-only",
  //   skip: !slug || !!data,
  // });

  // console.log(data, propertyDataOnLoad);

  // const propertyData = propertyDataOnLoad?.propertyBySlug ?? data;
  const { title, description } = data ?? {};
  return (
    <HomeLayout>
      <h2>{title}</h2>
      <p>{description}</p>
    </HomeLayout>
  );
}

export default PropertyProfile;
