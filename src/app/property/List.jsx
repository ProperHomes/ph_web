"use client";
import { useState, memo, Suspense, lazy } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import InfiniteScroll from "react-infinite-scroll-component";

import Card from "./Card";

import useToggleAuth from "src/hooks/useToggleAuth";
import usePagination from "src/hooks/usePagination";
import { removeDuplicateObjectsFromArray } from "@/utils/helper";
import { GET_PROPERTIES, GET_PROPERTIES_LOGGED_IN } from "@/graphql/properties";

const CreatePropertySaleRentLease = lazy(() =>
  import("../list-your-property-for-sale-rent-lease")
);
const Filters = lazy(() => import("@/components/Filters"));

const Section = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "1.2rem",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
  },
  width: "100%",
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
}) {
  const theme = useTheme();
  const [properties, setProperties] = useState([]);
  const [propertyIdToEdit, setPropertyIdToEdit] = useState(null);

  const { Auth, toggleAuth, isLoggedIn, loggedInUser } = useToggleAuth();

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

  const onChangeFilters = () => {
    handleLoadNext(false);
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

  return (
    <Stack spacing={2} sx={{ height: "100%" }}>
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          gutterBottom
          fontWeight={600}
          variant="h3"
          textAlign="left"
          fontSize={{ xs: "1.4rem", sm: "1.6rem" }}
        >
          {title ?? ""}
        </Typography>

        <Suspense fallback={<></>}>
          {showFilters && (
            <Box
              sx={{
                display: "flex",
                flexFlow: "row wrap",
                [theme.breakpoints.down("md")]: {
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    md: "repeat(6, 1fr)",
                  },
                },
                gap: "1em",
                width: { xs: "100%", md: "auto" },
              }}
            >
              <Filters
                typeLabel="Property Type"
                hideCity={!!cityProp}
                hideType={!!typeProp}
                hideListedFor={!!listedForProp}
                onChangeCity={onChangeFilters}
                onChangeBedrooms={onChangeFilters}
                onChangeListedFor={onChangeFilters}
                onChangePriceSort={onChangeFilters}
                onChangePropertyType={onChangeFilters}
                onReset={onChangeFilters}
                sx={{
                  "& fieldset": {
                    borderRadius: "8px",
                    borderColor: "#00000020",
                  },
                }}
              />
            </Box>
          )}
        </Suspense>
        {viewMoreLink && (
          <Button
            aria-label="view all"
            variant="contained"
            LinkComponent={Link}
            href={viewMoreLink}
            sx={{
              display: { xs: "none", sm: "flex" },
              borderRadius: "8px",
              fontSize: "1rem",
            }}
          >
            View More
          </Button>
        )}
      </Stack>

      {!infiniteScroll && !isSearch && !propertyIdToEdit && (
        <Section>
          {data.map((l, i) => {
            return (
              <Box key={i} sx={{ justifySelf: "center", width: "100%" }}>
                <Card
                  data={l}
                  showFavorite
                  isPriority={i < 9}
                  isFullWidth={listToShow.length > 3}
                  toggleAuth={toggleAuth}
                  togglePropertyEditor={toggleEditor(l.id)}
                />
              </Box>
            );
          })}
        </Section>
      )}

      {infiniteScroll && !propertyIdToEdit && (
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
                <Box key={i} sx={{ justifySelf: "center", width: "100%" }}>
                  <Card
                    data={l}
                    showFavorite
                    isPriority={i < 9}
                    isFullWidth={listToShow.length > 3}
                    toggleAuth={toggleAuth}
                    togglePropertyEditor={toggleEditor(l.id)}
                  />
                </Box>
              );
            })}
          </Section>
        </InfiniteScroll>
      )}

      <Suspense fallback={<></>}>
        {!!propertyIdToEdit && (
          <CreatePropertySaleRentLease
            data={propertyToEdit}
            handleCancel={toggleEditor()}
          />
        )}
        {Auth}
      </Suspense>
    </Stack>
  );
}

export default memo(PropertyList);
