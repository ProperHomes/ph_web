"use client";
import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Card from "./Card";
import CategoryBoxes from "src/components/CategoryBoxes";
import CreatePropertySaleRentLease from "../createProperty";
import useToggleAuth from "@/utils/hooks/useToggleAuth";
import { GET_PROPERTIES } from "@/graphql/properties";
import InfiniteScroll from "react-infinite-scroll-component";
import { removeDuplicateObjectsFromArray } from "@/utils/helper";
import useFilters from "@/utils/hooks/useFilters";

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
  viewAllLink,
  infiniteScroll,
  count,
  showFilters,
}) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [propertyIdToEdit, setPropertyIdToEdit] = useState(null);
  const [page, setPage] = useState(0);
  const [properties, setProperties] = useState([]);

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
        borderColor: theme.palette.grey[300],
      },
    },
  });

  const variables = { first: count, offset: page * 20 };
  if (type) {
    variables.type = type;
  }

  const [fethcProperties] = useLazyQuery(GET_PROPERTIES);

  const { data: propertiesData } = useQuery(GET_PROPERTIES, {
    variables,
    skip: !infiniteScroll || !count || page === 0,
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    const props = propertiesData?.properties?.nodes ?? [];
    if (props.length > 0) {
      setProperties((prev) => {
        return removeDuplicateObjectsFromArray([...prev, ...props]);
      });
    }
  }, [propertiesData]);

  useEffect(() => {
    const vars = { ...variables };
    if (city) {
      vars.city = city;
    }
    if (bedrooms) {
      vars.bedrooms = bedrooms;
    }
    if (listedFor) {
      vars.listedFor = listedFor;
    }
    fethcProperties({ variables: vars })
      .then((res) => {
        setProperties(res?.data?.properties?.nodes ?? []);
      })
      .catch((err) => {
        console.log("error fetching properties by filter changes");
      });
  }, [city, bedrooms, listedFor]);

  const toggleEditor = (id) => () => {
    setPropertyIdToEdit(id);
  };

  const handleFetchNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const isHome = pathname === "/";
  const showCategoryBoxes =
    (isHome || (!isHome && !isMobile)) && !pathname.includes("/dashboard");

  let listToShow = infiniteScroll && count ? properties : data ?? [];
  if (!city && !listedFor && !bedrooms) {
    listToShow = data;
  }

  const propertyToEdit = listToShow.find((l) => l.id === propertyIdToEdit);

  return (
    <Stack spacing={2}>
      {showCategoryBoxes && (
        <Stack pt={2} pb={4}>
          <CategoryBoxes />
        </Stack>
      )}
      {title && (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            gutterBottom
            color={theme.palette.text.primary}
            fontWeight={theme.typography.fontWeightMedium}
            fontFamily={theme.typography.fontFamily.Manrope}
            variant="h4"
            textAlign="left"
            fontSize={{ xs: "1.2rem", sm: "1.6rem" }}
          >
            {title}
          </Typography>

          {showFilters && (
            <Stack spacing={2} direction="row" alignItems="center">
              <CityDropdown />
              <BedroomsDropdown />
              <ListedForDropdown />
              <ResetButton />
            </Stack>
          )}
          {viewAllLink && (
            <Button
              variant="contained"
              LinkComponent={Link}
              href={viewAllLink}
              sx={{
                display: { xs: "none", sm: "flex" },
                borderRadius: "8px",
                fontSize: "1rem",
              }}
            >
              View All
            </Button>
          )}
        </Stack>
      )}

      <Section>
        {!infiniteScroll &&
          !propertyIdToEdit &&
          data.map((l, i) => {
            return (
              <Box key={i} sx={{ justifySelf: "center", width: "100%" }}>
                <Card
                  data={l}
                  isPriority={i < 9}
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
          hasMore={propertiesData?.properties?.totalCount > listToShow.length}
          endMessage={<></>}
          loader={<></>}
        >
          <Section>
            {listToShow.map((l, i) => {
              return (
                <Box key={i} sx={{ justifySelf: "center", width: "100%" }}>
                  <Card
                    data={l}
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
