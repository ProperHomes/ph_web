import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import NavLinks from "./NavLinks";

const NavbarRight = dynamic(() => import("./Right"));

function Navbar() {
  return (
    <Box
      pt={2}
      pb={{ xs: 1, sm: 0 }}
      sx={{
        width: "100vw",
        position: "sticky",
        top: 0,
        zIndex: 10,
        boxShadow: "0px 2px 20px 0px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            py={1}
            pb={2}
            spacing={1}
          >
            <Stack direction="row" alignItems="center">
              <Link
                href="/"
                title="ProperHomes"
                style={{ width: 200, height: 50 }}
              >
                <Image
                  src="/logo.png"
                  width={200}
                  height={50}
                  priority
                  quality={100}
                  alt="logo"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "0px !important",
                    position: "absolute",
                  }}
                >
                  ProperHomes
                </Typography>
              </Link>
              <NavLinks />
            </Stack>
            <NavbarRight />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Navbar;
