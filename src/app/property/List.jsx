"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import InfiniteScroll from "react-infinite-scroll-component";

import Card from "./Card";
import CreatePropertySaleRentLease from "../list-your-property-for-sale-rent-lease";

import useFilters from "src/hooks/useFilters";
import useToggleAuth from "src/hooks/useToggleAuth";
import usePagination from "src/hooks/usePagination";
import { removeDuplicateObjectsFromArray } from "@/utils/helper";
import { GET_PROPERTIES, GET_PROPERTIES_LOGGED_IN } from "@/graphql/properties";

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
  type,
  title,
  city: cityProp,
  listedFor: listedForProp,
  viewMoreLink,
  infiniteScroll,
  count,
  showFilters,
  isSearch,
  searchVariables,
  onCloseEditor,
}) {
  const theme = useTheme();
  const [properties, setProperties] = useState([]);
  const [propertyIdToEdit, setPropertyIdToEdit] = useState(null);

  const { Auth, toggleAuth, loggedInUser, isLoggedIn } = useToggleAuth();
  const {
    city,
    bedrooms,
    listedFor,
    propertyType,
    selectedPriceSort,
    ResetButton,
    CityDropdown,
    BedroomsDropdown,
    ListedForDropdown,
    SortPriceDropdown,
    PropertyTypeDropdown,
  } = useFilters({
    sx: {
      "& fieldset": {
        borderRadius: "8px",
        borderColor: "#00000020",
      },
    },
    isSearch,
    searchVariables,
    onReset: () => handleChangePage(0),
    onChangeCity: () => handleChangePage(0),
    onChangeBedrooms: () => handleChangePage(0),
    onChangeListedFor: () => handleChangePage(0),
    onChangePriceSort: () => handleChangePage(0),
    onChangePropertyType: () => handleChangePage(0),
  });

  let variables = { first: count, orderBy: ["CREATED_AT_DESC"] };
  if (type || propertyType) {
    variables.type = type ?? propertyType;
  }
  if (city || cityProp) {
    variables.city = cityProp ?? city;
  }
  if (bedrooms) {
    variables.bedrooms = bedrooms;
  }
  if (listedFor || listedForProp) {
    variables.listedFor = listedForProp ?? listedFor;
  }

  if (isLoggedIn) {
    variables.userId = loggedInUser.id;
  }

  if (isSearch) {
    variables = { ...variables, ...searchVariables };
  }

  if (selectedPriceSort) {
    variables.orderBy = [
      selectedPriceSort === "asc" ? "PRICE_ASC" : "PRICE_DESC",
      "CREATED_AT_DESC",
    ];
  }

  const { paginationObj, handleChangePage } = usePagination({
    key: "properties",
    QUERY: isLoggedIn ? GET_PROPERTIES_LOGGED_IN : GET_PROPERTIES,
    querySkip: (!infiniteScroll && !isSearch) || !count,
    variables,
    initialPageNo: isSearch ? 0 : 1,
    onNewData: (data, page) => {
      if (city || bedrooms || listedFor || selectedPriceSort || propertyType) {
        if (page === 0 || data.length === 0) {
          setProperties(data);
        } else {
          setProperties((prev) => {
            return removeDuplicateObjectsFromArray([...prev, ...data]);
          });
        }
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

  const handleFetchNextPage = () => {
    handleChangePage(paginationObj.currentPage + 1);
  };

  const listToShow =
    isSearch || (infiniteScroll && count) || city || bedrooms || listedFor
      ? properties
      : data ?? [];

  const propertyToEdit = listToShow.find((l) => l.id === propertyIdToEdit);

  const hasMore = paginationObj.pageInfo?.hasNextPage;

  return (
    <Stack spacing={2} sx={{ height: "100%" }}>
      {title && (
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            gutterBottom
            fontWeight={600}
            variant="h2"
            textAlign="left"
            fontSize={{ xs: "1.4rem", sm: "1.6rem" }}
          >
            {title}
          </Typography>

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
              <CityDropdown />
              {!type && <PropertyTypeDropdown label="Property Type" />}
              <BedroomsDropdown />
              {!listedForProp && <ListedForDropdown />}
              <SortPriceDropdown />
              <ResetButton />
            </Box>
          )}
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
      )}

      <Section>
        {!infiniteScroll &&
          !isSearch &&
          !propertyIdToEdit &&
          data.map((l, i) => {
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

      {infiniteScroll && !propertyIdToEdit && (
        <InfiniteScroll
          dataLength={listToShow.length}
          next={handleFetchNextPage}
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

      {!!propertyIdToEdit && (
        <CreatePropertySaleRentLease
          data={propertyToEdit}
          handleCancel={toggleEditor()}
        />
      )}
      {Auth}
    </Stack>
  );
}

export default PropertyList;
