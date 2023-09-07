"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import InfiniteScroll from "react-infinite-scroll-component";

import Card from "./Card";
import ListSkeleton from "../../components/ListSkeleton";
import CreatePropertySaleRentLease from "../list-your-property-for-sale-rent-lease";

import useFilters from "src/hooks/useFilters";
import useToggleAuth from "src/hooks/useToggleAuth";
import usePagination from "src/hooks/usePagination";
import { removeDuplicateObjectsFromArray } from "@/utils/helper";
import { GET_PROPERTIES, SEARCH_PROPERTIES } from "@/graphql/properties";

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
  const [properties, setProperties] = useState([]);
  const [propertyIdToEdit, setPropertyIdToEdit] = useState(null);

  const { Auth, toggleAuth } = useToggleAuth();
  const {
    city,
    bedrooms,
    listedFor,
    ResetButton,
    CityDropdown,
    BedroomsDropdown,
    ListedForDropdown,
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
  });

  let variables = { first: count };
  if (type) {
    variables.type = type;
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

  if (isSearch) {
    variables = { ...variables, ...searchVariables };
  }

  const { paginationObj, handleChangePage } = usePagination({
    key: isSearch ? "searchProperties" : "properties",
    QUERY: isSearch ? SEARCH_PROPERTIES : GET_PROPERTIES,
    querySkip: (!infiniteScroll && !isSearch) || !count,
    variables,
    initialPageNo: isSearch ? 0 : 1,
    onNewData: (data, page) => {
      if (city || bedrooms || listedFor) {
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
            variant="h4"
            textAlign="left"
            fontSize={{ xs: "1.4rem", sm: "1.6rem" }}
          >
            {title}
          </Typography>

          {showFilters && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr 1fr",
                  md: listedForProp ? "repeat(3, 1fr)" : "repeat(4, 1fr)",
                },
                gap: "1em",

                width: { xs: "100%", md: "auto" },
              }}
            >
              <CityDropdown />
              <BedroomsDropdown />
              {!listedForProp && <ListedForDropdown />}
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
          loader={<ListSkeleton />}
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
