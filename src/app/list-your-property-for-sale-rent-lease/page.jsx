import CreatePropertySaleRentLease from ".";

export const metadata = {
  alternates: {
    canonical:
      "https://www.properhomes.in/list-your-property-for-sale-rent-lease",
  },
};

export default async function Page() {
  return <CreatePropertySaleRentLease />;
}
