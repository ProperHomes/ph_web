"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DownloadIcon from "@mui/icons-material/Download";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContactDetailDialog from "./ContactBuilderDialog";
import useToggleAuth from "src/hooks/useToggleAuth";

export default function ContactButtons({ url, builder }) {
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
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ position: "absolute", bottom: 20, right: 20, zIndex: 10 }}
    >
      <Button
        size="medium"
        variant="contained"
        color="info"
        sx={{
          maxWidth: "200px",
        }}
        onClick={toggleContactDialog}
        startIcon={<LocalPhoneIcon />}
      >
        Contact Builder
      </Button>
      <Button
        size="medium"
        variant="contained"
        color="info"
        sx={{
          maxWidth: "200px",
        }}
        onClick={handleDownload}
        startIcon={<DownloadIcon />}
      >
        Download Brochure
      </Button>
      {showContactDetails && (
        <ContactDetailDialog
          builder={builder}
          handleClose={toggleContactDialog}
          open={showContactDetails}
        />
      )}
      {Auth}
    </Stack>
  );
}
