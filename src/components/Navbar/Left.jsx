import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import NavLinks from "./NavLinks";

function NavbarLeft() {
  const theme = useTheme();
  const router = useRouter();

  const navigateToHome = () => {
    router.push("/");
  };

  return (
    <Stack direction="row">
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
      <NavLinks />
    </Stack>
  );
}

export default NavbarLeft;
