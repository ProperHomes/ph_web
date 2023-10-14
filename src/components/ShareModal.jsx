"use client";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import {
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  PinterestShareButton,
  PinterestIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import useToast from "src/hooks/useToast";

export default function ShareModal({
  open,
  handleClose,
  title,
  url,
  urlTitle,
  media,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { Toast, toggleToast } = useToast();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toggleToast("Copied link successfully.");
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
            fontSize="1.5rem"
            fontWeight={600}
            sx={{ margin: "0 auto" }}
          >
            {title ?? "Share ProperHomes"}
          </Typography>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ minWidth: { xs: "100%", md: "380px" } }}>
        <Stack spacing={2} alignItems="center">
          <Stack
            direction="row"
            flexWrap="wrap"
            sx={{ position: "relative" }}
            spacing={2}
            alignItems="center"
          >
            <FacebookShareButton url={url} quote={urlTitle}>
              <FacebookIcon round />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={urlTitle}>
              <TwitterIcon round />
            </TwitterShareButton>
            <PinterestShareButton url={url} media={media}>
              <PinterestIcon round />
            </PinterestShareButton>
            <WhatsappShareButton url={url} title={urlTitle}>
              <WhatsappIcon round />
            </WhatsappShareButton>
            <LinkedinShareButton url={url} title={urlTitle}>
              <LinkedinIcon round />
            </LinkedinShareButton>
            <RedditShareButton url={url} title={urlTitle}>
              <RedditIcon round />
            </RedditShareButton>
          </Stack>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1}
            alignItems="center"
          >
            <Typography ml={4} noWrap maxWidth="80%">
              {window.location.href}
            </Typography>
            <Button
              variant="contained"
              sx={{ whiteSpace: "nowrap" }}
              onClick={copyToClipboard}
            >
              Copy Link
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
      {Toast}
    </Dialog>
  );
}
