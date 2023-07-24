import { useRouter } from "next/router";

function PropertyProfile() {
  const router = useRouter();
  const { type, listedFor, city } = router.query();
  return (
    <h2>
      A {type} in {city} for {listedFor}
    </h2>
  );
}

export default PropertyProfile;
