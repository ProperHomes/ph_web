'use client';
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function SlideDrawer({
  open,
  handleClose,
  position = "right",
  children,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Drawer
      anchor={isMobile ? "bottom" : position}
      open={open}
      onClose={handleClose}
      p={1}
      sx={{
        position: "relative",
        background: {
          xs: theme.palette.background.default,
          md: "initial",
        },
      }}
      PaperProps={{
        style: {
          width: isMobile ? "100%" : "350px",
          height: isMobile ? "70%" : "100%",
          padding: "0.5em 1em",
          borderRadius: isMobile ? "1em 1em 0 0" : 0,
          background: theme.palette.background.paper,
        },
      }}
    >
      {children}
    </Drawer>
  );
}

export default SlideDrawer;
