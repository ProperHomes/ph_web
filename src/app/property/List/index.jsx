"use client";
import { useState, memo } from "react";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";
import InfiniteScroll from "react-infinite-scroll-component";
import dynamic from "next/dynamic";

import useToggleAuth from "src/hooks/useToggleAuth";
import usePagination from "src/hooks/usePagination";
import {
  capitalizeFirstLetter,
  removeDuplicateObjectsFromArray,
} from "@/utils/helper";
import { GET_PROPERTIES, GET_PROPERTIES_LOGGED_IN } from "@/graphql/properties";

const Card = dynamic(() => import("../Card/index"));
const ListHeader = dynamic(() => import("./ListHeader"));
const ListSkeleton = dynamic(() => import("../../../components/ListSkeleton"), {
  ssr: false,
});
const CreatePropertySaleRentLease = dynamic(
  () => import("../../list-your-property-for-sale-rent-lease"),
  { ssr: false }
);

const Section = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 280px))",
  gap: "1.2rem",
  rowGap: "2em",
  width: "100%",
  justifyContent: "space-around",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 280px))",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "minmax(280px, 320px)",
  },
}));

function PropertyList({
  data,
  title,
  city: cityProp,
  listedFor: listedForProp,
  type: typeProp,
  viewMoreLink,
  infiniteScroll,
  count,
  isSearch,
  showFilters,
  onCloseEditor,
  searchParams = {},
  showSkeleton,
}) {
  const pathname = usePathname();
  const [properties, setProperties] = useState([]);
  const [propertyIdToEdit, setPropertyIdToEdit] = useState(null);

  const { isLoggedIn, loggedInUser } = useToggleAuth();

  const isDashboardManage = pathname.includes(`/dashboard/manage`);

  const { city, listedFor, bedrooms, type, priceSort } = searchParams ?? {};

  let variables = {
    first: count,
    orderBy: ["CREATED_AT_DESC"],
  };

  if (cityProp) {
    variables.city = cityProp;
  }

  if (typeProp) {
    variables.type = typeProp;
  }

  if (listedForProp) {
    variables.listedFor = listedForProp;
  }

  variables = { ...variables, ...searchParams };

  if (bedrooms && Number(bedrooms) !== NaN) {
    variables.bedrooms = Number(bedrooms);
  }
  if (priceSort) {
    variables.orderBy = [
      priceSort === "asc" ? "PRICE_ASC" : "PRICE_DESC",
      "CREATED_AT_DESC",
    ];
  } else {
    variables.orderBy = ["CREATED_AT_DESC"];
  }

  if (isLoggedIn) {
    variables.userId = loggedInUser?.id;
  }

  const { paginationObj, handleLoadNext } = usePagination({
    key: "properties",
    QUERY: isLoggedIn ? GET_PROPERTIES_LOGGED_IN : GET_PROPERTIES,
    querySkip: (!infiniteScroll && !isSearch) || !count,
    variables,
    onNewData: (data, append) => {
      if (!append) {
        setProperties(data);
      } else {
        setProperties((prev) => {
          return removeDuplicateObjectsFromArray([...prev, ...data]);
        });
      }
    },
  });

  const toggleEditor = (id) => () => {
    setPropertyIdToEdit(id);
    if (onCloseEditor) {
      onCloseEditor();
    }
  };

  const listToShow =
    isSearch ||
    (infiniteScroll && count) ||
    city ||
    bedrooms ||
    listedFor ||
    type
      ? properties
      : data ?? [];

  const propertyToEdit = listToShow.find((l) => l.id === propertyIdToEdit);

  const hasMore = paginationObj.pageInfo?.hasNextPage;

  const pageTitle = city
    ? `${title} in ${capitalizeFirstLetter(city)}`
    : title ?? "";

  return (
    <Stack spacing={2} sx={{ height: "100%" }}>
      <ListHeader
        title={pageTitle}
        city={cityProp}
        type={typeProp}
        listedFor={listedForProp}
        searchParams={searchParams}
        handleLoadNext={handleLoadNext}
        showFilters={showFilters}
        viewMoreLink={viewMoreLink}
      />

      {showSkeleton && <ListSkeleton n={10} />}

      {!infiniteScroll && !isSearch && !propertyIdToEdit && !showSkeleton && (
        <Section>
          {data.map((l, i) => {
            return (
              <Box key={i} sx={{ justifySelf: "center", width: "100%" }}>
                <Card
                  data={l}
                  showFavorite
                  isPriority={i < 9}
                  isManage={isDashboardManage}
                  isFullWidth={listToShow.length > 3}
                  togglePropertyEditor={toggleEditor(l.id)}
                />
              </Box>
            );
          })}
        </Section>
      )}

      {infiniteScroll && !propertyIdToEdit && !showSkeleton && (
        <InfiniteScroll
          dataLength={listToShow.length}
          next={handleLoadNext}
          hasMore={hasMore}
          endMessage={<></>}
          loader={<></>}
        >
          <Section>
            {listToShow.map((l, i) => {
              return (
                <Box key={i} sx={{ justifySelf: "center" }}>
                  <Card
                    data={l}
                    showFavorite
                    isManage={isDashboardManage}
                    isPriority={i < 9}
                    isFullWidth={listToShow.length > 3}
                    togglePropertyEditor={toggleEditor(l.id)}
                  />
                </Box>
              );
            })}
          </Section>
        </InfiniteScroll>
      )}

      {!!propertyIdToEdit && (
        <CreatePropertySaleRentLease
          data={propertyToEdit}
          handleCancel={toggleEditor()}
        />
      )}
    </Stack>
  );
}

export default memo(PropertyList);
