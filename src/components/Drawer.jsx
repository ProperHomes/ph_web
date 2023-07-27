import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function SlideDrawer({
  open,
  handleClose,
  title,
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
          padding: "0.5em 1em",
          borderRadius: isMobile ? "1em 1em 0 0" : 0,
          background: theme.palette.background.paper,
        },
      }}
    >
      <Typography
        color={theme.palette.text.primary}
        fontFamily={theme.typography.fontFamily.Monsterrat}
        fontWeight={500}
        textAlign={"center"}
        sx={{
          marginTop: 1,
          marginLeft: { xs: "1rem", md: 0 },
        }}
      >
        {title}
      </Typography>

      {children}
    </Drawer>
  );
}

export default SlideDrawer;
