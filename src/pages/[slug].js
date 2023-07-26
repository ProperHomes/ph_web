import RentalAgreement from "@/containers/RentalAgreement/index";
import RentRecieptGenerator from "@/containers/RentRecieptGenerator/index";
import { ALL_CITIES } from "@/utils/constants";

function Page({ isRentalAgreementPage, city }) {
  return isRentalAgreementPage ? (
    <RentalAgreement city={city} />
  ) : (
    <RentRecieptGenerator />
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const isRentalAgreementPage =
    slug === "rental-agreement" ||
    slug.split("-").slice(0, 3).join("-") === "rental-agreement-in";
  const rentalAgreementCity =
    slug === "rental-agreement" ? "" : slug.split("-").pop();
  return {
    props: {
      isRentalAgreementPage,
      city: rentalAgreementCity,
    },
  };
}

export async function getStaticPaths() {
  let paths = [{ params: { slug: "rental-agreement" } }];
  for (let city of ALL_CITIES) {
    paths.push({
      params: { slug: `rental-agreement-in-${city.toLowerCase()}` },
    });
  }
  return { paths, fallback: true };
}

export default Page;
