import PropertyList from "../property/List";

export default function Page({ searchParams }) {
  const title = `Properties Returned`;
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
