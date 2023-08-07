"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import NavLinks from "./NavLinks";

function NavbarLeft() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Stack direction="row">
      <Link href="/">
        <Typography
          color={theme.palette.primary.main}
          fontFamily={theme.typography.fontFamily.Monsterrat}
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
      </Link>

      <NavLinks />
    </Stack>
  );
}

export default NavbarLeft;
