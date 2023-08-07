"use client";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Save from "@mui/icons-material/Save";
import Share from "@mui/icons-material/Share";

import SellerInfoCard from "./SellerInfoCard";

function Sidebar({ data }) {
  return (
    <Stack spacing={2}>
      <SellerInfoCard createdAt={data?.createdAt} />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button startIcon={<Save />} fullWidth color="info">
          Save Property
        </Button>
        <Button startIcon={<Share />} fullWidth color="info">
          Share Property
        </Button>
      </Stack>
    </Stack>
  );
}

export default Sidebar;
