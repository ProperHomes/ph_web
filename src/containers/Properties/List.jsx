import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Card from "./Card";
import CategoryBoxes from "@/components/CategoryBoxes";
import { usePropertyContext } from "./context";
import CreatePropertySaleRentLease from "./Create";

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

function PropertyList({ data, title }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [propertyIdToEdit, setPropertyIdToEdit] = useState(false);

  const { state } = usePropertyContext();
  const { list } = state;
  const listToShow = data ?? list;

  const toggleEditor = (id) => () => {
    setPropertyIdToEdit(id);
  };

  const isHome = router.pathname === "/";
  const showCategoryBoxes =
    (isHome || (!isHome && !isMobile)) &&
    !router.pathname.includes("/dashboard");

  const propertyToEdit = listToShow.find((l) => l.id === propertyIdToEdit);

  return (
    <Stack spacing={2}>
      {showCategoryBoxes && (
        <Stack pb={4}>
          <CategoryBoxes />
        </Stack>
      )}
      {title && (
        <Typography
          color={theme.palette.text.primary}
          variant="h4"
          textAlign="left"
          fontSize={{ xs: "1.2rem", sm: "1.5rem" }}
        >
          {title}
        </Typography>
      )}
      <Section>
        {!propertyIdToEdit &&
          listToShow.map((l, i) => {
            return (
              <Box key={i} sx={{ justifySelf: "center", width: "100%" }}>
                <Card
                  data={l}
                  isPriority={i < 9}
                  togglePropertyEditor={toggleEditor(l.id)}
                />
              </Box>
            );
          })}
      </Section>
      {!!propertyIdToEdit && (
        <CreatePropertySaleRentLease
          data={propertyToEdit}
          handleCancel={toggleEditor()}
        />
      )}
    </Stack>
  );
}

export default PropertyList;
