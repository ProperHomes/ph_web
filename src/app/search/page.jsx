import PropertyList from "../property/List";

export const metadata = {
  alternates: {
    canonical: "https://www.properhomes.in/search",
  },
};

export default function Page({ searchParams }) {
  const title = `Search Properties`;
  return (
    <PropertyList
      showFilters
      isSearch
      searchParams={searchParams}
      infiniteScroll
      count={20}
      title={title}
    />
  );
}
