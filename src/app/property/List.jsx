"use client";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import Pagination from "@mui/material/Pagination";

import Card from "./Card";
import CreatePropertySaleRentLease from "../list-your-property-for-sale-rent-lease";
import useToggleAuth from "src/hooks/useToggleAuth";
import { GET_PROPERTIES, SEARCH_PROPERTIES } from "@/graphql/properties";
import { removeDuplicateObjectsFromArray } from "@/utils/helper";
import useFilters from "src/hooks/useFilters";
import usePagination from "src/hooks/usePagination";

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
  showPagination,
  isSearch,
  searchText,
  searchResultsTotalCount,
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
    onReset: () => handleChangePage(0),
    onChangeCity: () => handleChangePage(0),
    onChangeBedrooms: () => handleChangePage(0),
    onChangeListedFor: () => handleChangePage(0),
  });

  const variables = { first: count };
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

  const [searchProperties] = useLazyQuery(SEARCH_PROPERTIES);

  //Todo: modify this to use this for search_properties lazy query too
  const { paginationObj, handleChangePage } = usePagination({
    key: "properties",
    QUERY: GET_PROPERTIES,
    querySkip: (!infiniteScroll && !showPagination) || !count || isSearch,
    variables,
    initialPageNo: showPagination || isSearch ? 0 : 1,
    onNewData: (data, page) => {
      if ((city || bedrooms || listedFor) && page === 0) {
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

  const handleFetchNextPage = () => {
    handleChangePage(paginationObj.currentPage + 1);
  };

  const handleSearch = async () => {
    try {
      const { data } = await searchProperties({
        variables: {
          searchText,
          city,
          first: count,
        },
      });
      setProperties(data?.searchProperties?.nodes ?? []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePaginationPage = (_e, page) => {
    if (isSearch) {
      handleSearch();
    } else {
      handleChangePage(page);
    }
  };

  const listToShow =
    (isSearch && paginationObj.currentPage > 0) ||
    showPagination ||
    (infiniteScroll && count) ||
    city ||
    bedrooms ||
    listedFor
      ? properties
      : data ?? [];

  const propertyToEdit = listToShow.find((l) => l.id === propertyIdToEdit);

  const hasMore = paginationObj.pageInfo?.hasNextPage;

  const totalNoOfPages = Math.ceil(
    (searchResultsTotalCount ?? paginationObj?.totalCount) / (count ?? 10)
  );

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
          !showPagination &&
          !propertyIdToEdit &&
          data.map((l, i) => {
            return (
              <Box key={i} sx={{ justifySelf: "center", width: "100%" }}>
                <Card
                  data={l}
                  showFavorite
                  isPriority={i < 9}
                  toggleAuth={toggleAuth}
                  togglePropertyEditor={toggleEditor(l.id)}
                />
              </Box>
            );
          })}
      </Section>

      {(isSearch || showPagination) && (
        <>
          <Section>
            {listToShow.map((l, i) => {
              return (
                <Box key={i} sx={{ justifySelf: "center", width: "100%" }}>
                  <Card
                    data={l}
                    showFavorite
                    isPriority={i < 9}
                    toggleAuth={toggleAuth}
                    togglePropertyEditor={toggleEditor(l.id)}
                  />
                </Box>
              );
            })}
          </Section>
          {totalNoOfPages > 1 && (
            <Stack alignItems="center" justifyContent="center">
              <Pagination
                defaultPage={0}
                page={paginationObj.currentPage}
                onChange={handleChangePaginationPage}
                count={totalNoOfPages}
              />
            </Stack>
          )}
        </>
      )}

      {infiniteScroll && !isSearch && !propertyIdToEdit && (
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
