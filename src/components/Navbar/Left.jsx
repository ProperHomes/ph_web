"use client";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import NavLinks from "./NavLinks";
import { usePathname } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

function NavbarLeft() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack direction="row">
      <Link href="/">
        <Stack direction="row" alignItems="center">
          <Image src="/assets/images/LogoIcon.png" width={35} height={30} />
          <Typography
            color={theme.palette.primary.main}
            fontSize={{ xs: "1.4rem", sm: "1.8rem", md: "2rem" }}
            fontWeight={600}
            fontFamily={theme.typography.fontFamily.Raleway}
            sx={{
              cursor: "pointer",
              maxWidth: "280px",
              height: "auto",
            }}
          >
            ProperHomes
          </Typography>
        </Stack>
      </Link>
      <NavLinks />
    </Stack>
  );
}

export default NavbarLeft;
