import PropertyList from "../property/List";
export default function Page() {
  return <PropertyList infiniteScroll isSearch count={20} showFilters />;
}
