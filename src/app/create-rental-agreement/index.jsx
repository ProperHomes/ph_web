"use client";
import { usePathname } from "next/navigation";
import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBack from "@mui/icons-material/ArrowBack";

import RentalAgreementCreator from "./creator";

// Todo: https://www.magicbricks.com/rentalagreement/index.html

function RentalAgreement({ city, handleGoBack }) {
  const pathname = usePathname();
  const theme = useTheme();

  const isDashboardManage = pathname.includes("/dashboard/manage");

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
        borderRadius: "1em",
        position: "relative",
      }}
    >
      {isDashboardManage && (
        <Button startIcon={<ArrowBack />} onClick={handleGoBack}>
          Go Back
        </Button>
      )}
      {!isDashboardManage && (
        <Stack py={2} alignItems="center">
          <Typography
            pt={2}
            gutterBottom
            variant="h1"
            textAlign="center"
            fontWeight={600}
            fontSize={{ xs: "1.5rem", md: "2.5rem" }}
          >
            Create Rental Agreement {city ? `in ${city.toLowerCase()}` : ""}
          </Typography>
          <Typography
            fontSize="1.2rem"
            align="center"
            maxWidth="800px"
            gutterBottom
          >
            Generate a rental agreement for <b>11 months</b> between Owner and
            Tenant.
          </Typography>
        </Stack>
      )}

      <RentalAgreementCreator />
    </Box>
  );
}

export default RentalAgreement;
