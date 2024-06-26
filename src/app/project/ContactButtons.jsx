"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DownloadIcon from "@mui/icons-material/Download";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContactDetailDialog from "./ContactBuilderDialog";
import useToggleAuth from "src/hooks/useToggleAuth";

export default function ContactButtons({
  url,
  builder,
  isBuilder,
  disableBrochure = false,
}) {
  const { isLoggedIn, toggleAuth, Auth } = useToggleAuth();
  const [showContactDetails, setShowContactDialog] = useState(false);

  const handleDownload = () => {
    window.open(url, "_blank");
  };

  const toggleContactDialog = () => {
    if (isLoggedIn) {
      setShowContactDialog((prev) => !prev);
    } else {
      toggleAuth();
    }
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      alignItems={{ xs: "flex-start", md: "center" }}
      sx={{ position: "absolute", bottom: 20, right: 20, zIndex: 10 }}
    >
      <Button
        size="medium"
        variant="contained"
        color="orange"
        sx={{
          maxWidth: "200px",
          whiteSpace: "nowrap",
        }}
        onClick={toggleContactDialog}
        startIcon={<LocalPhoneIcon />}
      >
        Contact Builder
      </Button>
      {!disableBrochure && (
        <Button
          size="medium"
          variant="contained"
          color="orange"
          sx={{
            maxWidth: "200px",
            whiteSpace: "nowrap",
          }}
          onClick={handleDownload}
          startIcon={<DownloadIcon />}
        >
          Download Brochure
        </Button>
      )}
      {showContactDetails && (
        <ContactDetailDialog
          builder={builder}
          isBuilder={isBuilder}
          handleClose={toggleContactDialog}
          open={showContactDetails}
        />
      )}
      {Auth}
    </Stack>
  );
}
