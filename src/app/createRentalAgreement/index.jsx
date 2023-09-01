"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ArrowBack from "@mui/icons-material/ArrowBack";
import Close from "@mui/icons-material/Close";
import RentalAgreementCreator from "./creator";
import RentalAgreementPreview from "./Preview";

// Todo: https://www.magicbricks.com/rentalagreement/index.html

function RentalAgreement({ city, handleGoBack }) {
  const pathname = usePathname();
  const theme = useTheme();
  const [showAgreement, setShowAgreement] = useState(false);

  const togglePreviewAgreement = () => {
    setShowAgreement((prev) => !prev);
  };

  const isDashboard = pathname.includes("/dashboard");

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
      {isDashboard && (
        <Button
          sx={{ position: "absolute", top: 10, left: 10 }}
          startIcon={<ArrowBack />}
          onClick={handleGoBack}
        >
          Go Back
        </Button>
      )}
      <Stack py={2} alignItems="center">
        <Typography
          pt={2}
          gutterBottom
          variant="h1"
          textAlign="center"
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
          Generate a rental agreement for <b>11 months</b> between you and your
          tenant.
        </Typography>
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <RentalAgreementCreator
          togglePreviewAgreement={togglePreviewAgreement}
        />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <RentalAgreementPreview />
        </Box>
      </Stack>

      <Dialog open={showAgreement} onClose={togglePreviewAgreement}>
        <DialogContent sx={{ padding: "20px 0 20px 0" }}>
          <IconButton
            onClick={togglePreviewAgreement}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <Close />
          </IconButton>

          <RentalAgreementPreview />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default RentalAgreement;
