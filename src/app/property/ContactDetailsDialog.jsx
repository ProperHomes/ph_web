"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";

import { FETCH_PROPERTY_OWNER_BUILDER_DETAILS } from "@/graphql/properties";

export default function ContactDetailDialog({ open, data, handleClose }) {
  const { propertyId, city, pincode, ownerId, projectId, project } = data;
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: ownerData } = useQuery(FETCH_PROPERTY_OWNER_BUILDER_DETAILS, {
    variables: { propertyId },
    skip: !ownerId && !!projectId,
  });

  const contactDetails = {
    city,
    pincode,
    ...(ownerData?.property?.owner ?? project?.builder ?? {}),
  };
  delete contactDetails.id;
  delete contactDetails?.["__typename"];

  const navigateToProject = () => {
    router.push(`/project/${project?.slug}`);
  };

  return (
    <Dialog
      fullScreen={isMobile}
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: isMobile ? 0 : "1em" } }}
    >
      <DialogTitle>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon fontSize="12px" />
          </IconButton>
          <Typography
            variant="subtitle1"
            fontWeight={500}
            sx={{ margin: "0 auto" }}
          >
            Property Contact Details
          </Typography>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ minWidth: { xs: "100%", md: "380px" } }}>
        <Stack sx={{ position: "relative", borderRadius: "1em" }} spacing={2}>
          {Object.keys(contactDetails).map((key) => {
            return (
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography key={key} fontWeight="bold">
                  {key}:
                </Typography>{" "}
                <Typography key={key}>{contactDetails[key]}</Typography>
              </Stack>
            );
          })}
          {project?.slug && (
            <Button
              variant="contained"
              color="info"
              onClick={navigateToProject}
            >
              View Project Profile
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
