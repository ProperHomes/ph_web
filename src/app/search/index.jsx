import PropertyList from "../property/List";

export default function SearchMain() {
  const title = `Properties Returned`;
  return (
    <PropertyList
      showFilters
      isSearch
      infiniteScroll
      count={20}
      title={title}
    />
  );
}
