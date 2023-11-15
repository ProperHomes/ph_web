"use client";
import { useRouter } from "next/navigation";
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

export default function ContactDetailDialog({ open, builder, handleClose }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const contactDetails = {};
  const keysNotNeeded = ["__typename", "id", "slug", "logo"];
  for (let key in builder) {
    if (!keysNotNeeded.includes(key)) {
      contactDetails[key] = builder[key];
    }
  }

  const navigateToBuilder = () => {
    router.push(`/builder/${builder?.slug}`);
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
            Project Builder Contact Details
          </Typography>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ minWidth: { xs: "100%", md: "380px" } }}>
        <Stack
          sx={{ position: "relative", borderRadius: "1em" }}
          spacing={2}
          pb={2}
        >
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
        </Stack>
        <Button variant="contained" color="info" onClick={navigateToBuilder}>
          View Builder Profile
        </Button>
      </DialogContent>
    </Dialog>
  );
}
