"use client";
import { Suspense, lazy } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Save from "@mui/icons-material/Save";
import Share from "@mui/icons-material/Share";

const SellerInfoCard = lazy(() => import("./SellerInfoCard"));

function Sidebar({ data }) {
  return (
    <Suspense fallback={<></>}>
      <Stack spacing={2}>
        <SellerInfoCard
          createdAt={data?.createdAt}
          listedFor={data?.listedFor}
          propertyId={data?.id}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button startIcon={<Save />} fullWidth color="info">
            Save Property
          </Button>
          <Button startIcon={<Share />} fullWidth color="info">
            Share Property
          </Button>
        </Stack>
      </Stack>
    </Suspense>
  );
}

export default Sidebar;
