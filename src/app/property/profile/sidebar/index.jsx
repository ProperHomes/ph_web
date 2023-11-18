"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Save from "@mui/icons-material/Save";
import Share from "@mui/icons-material/Share";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import useToggleFavoriteProperty from "src/hooks/useToggleFavoriteProperty";
import ShareModal from "@/components/ShareModal";
import useToggleAuth from "src/hooks/useToggleAuth";

const StickyBox = dynamic(() => import("../../../../components/StickyBox"));
const SellerInfoCard = dynamic(() => import("./SellerInfoCard"));

function Sidebar({ data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { title, media, slug } = data;

  const images = media?.nodes ?? [];
  const mainImage = images.find((im) => !!im.isCoverImage) ?? images[0];

  const [showShareModal, setShowShareModal] = useState(false);
  const toggleShareModal = () => {
    setShowShareModal((prev) => !prev);
  };

  const { toggleAuth, Auth } = useToggleAuth();
  const { isSaved, handleToggleFavorite } = useToggleFavoriteProperty({
    canCheckWithApi: true,
    toggleAuth,
    data,
  });

  const url = `https://properhomes.in/property/${slug}`;

  return (
    <StickyBox
      offsetTop={150}
      offsetBottom={20}
      bottom={isMobile}
      style={{
        maxHeight: "250px",
        maxWidth: "100%",
        zIndex: 2,
      }}
    >
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
      <Stack sx={{ backgroundColor: "#fff" }}>
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            aria-label="save property"
            startIcon={<Save />}
            color="orange"
            size="large"
            sx={{ whiteSpace: "nowrap" }}
            onClick={handleToggleFavorite}
          >
            {isSaved ? "Property Saved " : "Save Property"}
          </Button>
          <Button
            aria-label="share property"
            startIcon={<Share />}
            color="orange"
            size="large"
            sx={{ whiteSpace: "nowrap" }}
            onClick={toggleShareModal}
          >
            Share Property
          </Button>
        </Stack>
        <Stack spacing={2} my={2}>
          <SellerInfoCard data={data} />
        </Stack>
      </Stack>

      {Auth}
    </StickyBox>
  );
}

export default Sidebar;
