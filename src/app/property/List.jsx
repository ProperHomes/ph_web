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

import Card from "./Card";
import CategoryBoxes from "src/components/CategoryBoxes";
import CreatePropertySaleRentLease from "../createProperty";
import useToggleAuth from "@/utils/hooks/useToggleAuth";
import { GET_PROPERTIES } from "@/graphql/properties";
import InfiniteScroll from "react-infinite-scroll-component";
import { removeDuplicateObjectsFromArray } from "@/utils/helper";

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

function PropertyList({ data, title, viewAllLink, infiniteScroll, count }) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [propertyIdToEdit, setPropertyIdToEdit] = useState(null);
  const [page, setPage] = useState(0);
  const [properties, setProperties] = useState([]);

  const { Auth, toggleAuth } = useToggleAuth();

  const { data: propertiesData } = useQuery(GET_PROPERTIES, {
    variables: { first: count, offset: page * 20 },
    skip: !infiniteScroll || !count,
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

  const listToShow = infiniteScroll && count ? properties : data ?? [];

  const toggleEditor = (id) => () => {
    setPropertyIdToEdit(id);
  };

  const handleFetchNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const isHome = pathname === "/";
  const showCategoryBoxes =
    (isHome || (!isHome && !isMobile)) && !pathname.includes("/dashboard");

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
          direction="row"
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
          listToShow.map((l, i) => {
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
