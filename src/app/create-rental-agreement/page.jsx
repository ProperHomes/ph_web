import RentalAgreement from ".";
import { ALL_CITIES } from "@/utils/constants";

export default async function Page() {
  return <RentalAgreement />;
}

export function generateStaticParams() {
  let paths = ["create-rental-agreement"];
  for (let city of ALL_CITIES) {
    paths.push({
      slug: `create-rental-agreement-in-${city.toLowerCase()}`,
    });
  }
  return paths;
}
