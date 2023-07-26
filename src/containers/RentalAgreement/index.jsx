import HomeLayout from "@/components/Layouts/HomeLayout";

function RentalAgreement({ city }) {
  return (
    <HomeLayout>
      <h2>Create Rental Agreement {city ? `in ${city.toLowerCase()}` : ""}</h2>
    </HomeLayout>
  );
}

export default RentalAgreement;
