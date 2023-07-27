import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

function SlideDrawer({
  open,
  handleClose,
  title,
  position = "right",
  children,
}) {
  const theme = useTheme();
  return (
    <Drawer
      anchor={position}
      open={open}
      onClose={handleClose}
      p={1}
      sx={{
        position: "relative",
        background: {
          xs: theme.palette.background.default,
          minHeight: "80vh",
          md: "initial",
        },
      }}
      PaperProps={{
        style: {
          width: "350px",
          padding: "0.5em 1em",
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
