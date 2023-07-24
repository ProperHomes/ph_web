import HomeLayout from "@/components/Layouts/HomeLayout";
import { useRouter } from "next/router";

function PropertyProfile({ data }) {
  const router = useRouter();
  const { slug } = router.query;
  const { title, description } = data ?? {};
  return (
    <HomeLayout>
      <h2>{title}</h2>
      <p>{description}</p>
    </HomeLayout>
  );
}

export default PropertyProfile;
