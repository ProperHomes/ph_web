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
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button
          aria-label="save property"
          startIcon={<Save />}
          fullWidth
          color="info"
          size="large"
        >
          Save Property
        </Button>
        <Button
          aria-label="share property"
          startIcon={<Share />}
          fullWidth
          color="info"
          size="large"
        >
          Share Property
        </Button>
      </Stack>
      <Stack spacing={2}>
        <SellerInfoCard
          createdAt={data?.createdAt}
          listedFor={data?.listedFor}
          propertyId={data?.id}
        />
      </Stack>
    </Suspense>
  );
}

export default Sidebar;
