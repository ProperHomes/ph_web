"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DownloadIcon from "@mui/icons-material/Download";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export default function ContactButtons({ url }) {
  const handleDownload = () => {
    window.open(url, "_blank");
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
        onClick={handleDownload}
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
    </Stack>
  );
}
