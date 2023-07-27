
function RentalAgreement({ city }) {
  return (
    <>
      <h2>Create Rental Agreement {city ? `in ${city.toLowerCase()}` : ""}</h2>
    </>
  );
}

export default RentalAgreement;
