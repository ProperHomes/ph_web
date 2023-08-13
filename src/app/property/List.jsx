"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import InfiniteScroll from "react-infinite-scroll-component";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import ContentPasteOffIcon from "@mui/icons-material/ContentPasteOff";

import Card from "./Card";
import CategoryBoxes from "src/components/CategoryBoxes";
import CreatePropertySaleRentLease from "../createProperty";
import useToggleAuth from "@/utils/hooks/useToggleAuth";
import { GET_PROPERTIES } from "@/graphql/properties";
import { removeDuplicateObjectsFromArray } from "@/utils/helper";
import useFilters from "@/utils/hooks/useFilters";
import ZeroBoxes from "@/components/ZeroBoxes";

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

const infoBoxes = [
  {
    title: "Zero Spam",
    color: "#faf6ff",
    Icon: PhoneDisabledIcon,
    description: `No calls or spam messages without your explicit consent.`,
  },
  {
    title: "Zero Brokerage",
    color: "#eaf9f5",
    Icon: MoneyOffIcon,
    description: `  100% Real Owner Verified Properties. No brokers or middlemen
    involved.`,
  },
  {
    title: "Zero Paperwork",
    color: "#f0f8ff",
    Icon: ContentPasteOffIcon,
    description: ` 100% Digital experience. Even if its Aadhar verification or Police
    Verification.`,
  },
  {
    title: "Zero Spam",
    color: "#f9f7e7",
    Icon: ContentPasteOffIcon,
    description: `No spam calls or spam messages without your explicit consent.`,
  },
];

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
    onChangeCity: () => setPage(0),
    onChangeBedrooms: () => setPage(0),
    onChangeListedFor: () => setPage(0),
  });

  const variables = { first: count, offset: page * count };
  if (type) {
    variables.type = type;
  }
  if (city) {
    variables.city = city;
  }
  if (bedrooms) {
    variables.bedrooms = bedrooms;
  }
  if (listedFor) {
    variables.listedFor = listedFor;
  }

  const { data: propertiesData } = useQuery(GET_PROPERTIES, {
    variables,
    skip: !infiniteScroll || !count,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const props = propertiesData?.properties?.nodes ?? [];
    if (props.length > 0) {
      if ((city || bedrooms || listedFor) && page === 0) {
        setProperties(props);
      } else {
        setProperties((prev) => {
          return removeDuplicateObjectsFromArray([...prev, ...props]);
        });
      }
    }
  }, [propertiesData]);

  const toggleEditor = (id) => () => {
    setPropertyIdToEdit(id);
  };

  const handleFetchNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const isHome = pathname === "/";
  const showCategoryBoxes =
    (isHome || (!isHome && !isMobile)) && !pathname.includes("/dashboard");

  let listToShow =
    (infiniteScroll && count && page > 0) || city || bedrooms || listedFor
      ? properties
      : data ?? [];

  const propertyToEdit = listToShow.find((l) => l.id === propertyIdToEdit);

  return (
    <Stack spacing={2} sx={{ height: "100%" }}>
      {showCategoryBoxes && (
        <Stack py={2}>
          <CategoryBoxes />
        </Stack>
      )}

      {isHome && <ZeroBoxes />}

      {title && (
        <Stack
          spacing={2}
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
            fontSize={{ xs: "1.4rem", sm: "1.6rem" }}
          >
            {title}
          </Typography>

          {showFilters && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1em",
                [theme.breakpoints.down("sm")]: {
                  gridTemplateColumns: "1fr 1fr",
                },
                width: { xs: "100%", md: "auto" },
              }}
            >
              <CityDropdown />
              <BedroomsDropdown />
              <ListedForDropdown />
              <ResetButton />
            </Box>
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
          hasMore={
            page === 0
              ? true
              : propertiesData?.properties?.totalCount > listToShow.length
          }
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
