import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

function NavbarLeft() {
  const theme = useTheme();
  const router = useRouter();

  const navigateToHome = () => {
    router.push("/");
  };

  return (
    <Typography
      onClick={navigateToHome}
      color={theme.palette.primary.main}
      fontFamily={theme.typography.fontFamily.Manrope}
      fontSize={{ xs: "1.4rem", sm: "1.8rem", md: "2rem" }}
      fontWeight={600}
      sx={{
        cursor: "pointer",
        maxWidth: "280px",
        height: "auto",
      }}
    >
      ProperHomes
    </Typography>
  );
}

export default NavbarLeft;
