"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppContext } from "src/appContext";
import CardOptionsTooltip from "../CardOptions";
import useToggleFavoriteProperty from "src/hooks/useToggleFavoriteProperty";
import useToggleAuth from "src/hooks/useToggleAuth";

export default function CardOptions({
  data,
  showFavorite = true,
  togglePropertyEditor,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { state: appState } = useAppContext();
  const { id, slug, ownerId, tenantId, currentUserSavedProperties } = data;

  const { toggleAuth, Auth } = useToggleAuth();

  const isDashboardManage = pathname.includes("/dashboard/manage");

  const currentUserSavedPropertyId = currentUserSavedProperties?.nodes[0]?.id;

  const { handleToggleFavorite, isSaved } = useToggleFavoriteProperty({
    data: { id, ownerId },
    currentUserSavedPropertyId,
    toggleAuth,
  });

  const [showOwnerActions, setShowOwnerActions] = useState(false);

  const handleChangePropertyStatus = () => {};

  const handleEditProperty = () => {
    togglePropertyEditor();
  };
  const handleViewPropertyAsPublic = () => {
    router.push(`/property/${slug}`);
  };

  const handleManageProperty = () => {
    router.push(`/dashboard/manage/property/${slug}`);
  };

  const ownerActionList = [
    { title: "Manage Property", onClick: handleManageProperty },
    { title: "Edit Property", onClick: handleEditProperty },
    { title: "Change Status", onClick: handleChangePropertyStatus },
    { title: "View Property as Public", onClick: handleViewPropertyAsPublic },
  ];

  const toggleOwnerActions = () => {
    setShowOwnerActions((prev) => !prev);
  };

  const isOwner = ownerId === appState.user?.id;

  return (
    <Stack>
      {Auth}
      {!isOwner && !tenantId && showFavorite && (
        <Tooltip
          enterDelay={0}
          title={isSaved ? "Remove Saved Property" : "Save Property"}
        >
          <FavoriteIcon
            onClick={handleToggleFavorite}
            sx={{
              color: "rgba(0, 0, 0, 0.5)",
              stroke: "#fff",
              strokeWidth: 2,
              position: "absolute",
              right: 10,
              top: 10,
              zIndex: 1,
              fill: isSaved ? "red" : "rgba(0, 0, 0, 0.5)",
            }}
          />
        </Tooltip>
      )}

      {isOwner && isDashboardManage && (
        <Box
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            zIndex: 1,
            backgroundColor: "rgba(0,0,0, 0.6)",
            borderRadius: "50%",
          }}
        >
          <CardOptionsTooltip
            open={showOwnerActions}
            toggleOptions={toggleOwnerActions}
            listItems={ownerActionList}
          />
        </Box>
      )}
    </Stack>
  );
}
