"use client";
import { Suspense, lazy, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Save from "@mui/icons-material/Save";
import Share from "@mui/icons-material/Share";

import useToggleFavoriteProperty from "src/hooks/useToggleFavoriteProperty";
import ShareModal from "@/components/ShareModal";

const SellerInfoCard = lazy(() => import("./SellerInfoCard"));

function Sidebar({ data }) {
  const { title, media, slug } = data;

  const images = media?.nodes ?? [];
  const mainImage = images.find((im) => !!im.isCoverImage) ?? images[0];

  const [showShareModal, setShowShareModal] = useState(false);
  const toggleShareModal = () => {
    setShowShareModal((prev) => !prev);
  };

  const { isSaved, handleToggleFavorite } = useToggleFavoriteProperty({
    canCheckWithApi: true,
    data,
  });

  const url = `https://properhomes.in/property/${slug}`;

  return (
    <Suspense fallback={<></>}>
      {showShareModal && (
        <ShareModal
          url={url}
          title="Share Property"
          urlTitle={title}
          media={mainImage?.media?.signedUrl ?? mainImage?.mediaUrl}
          open={showShareModal}
          handleClose={toggleShareModal}
        />
      )}
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          aria-label="save property"
          startIcon={<Save />}
          color="info"
          size="large"
          sx={{ whiteSpace: "nowrap" }}
          onClick={handleToggleFavorite}
        >
          {isSaved ? "Property Saved " : "Save Property"}
        </Button>
        <Button
          aria-label="share property"
          startIcon={<Share />}
          color="info"
          size="large"
          sx={{ whiteSpace: "nowrap" }}
          onClick={toggleShareModal}
        >
          Share Property
        </Button>
      </Stack>
      <Stack spacing={2} my={2}>
        <SellerInfoCard {...data} />
      </Stack>
    </Suspense>
  );
}

export default Sidebar;
