import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NavLinks from "./NavLinks";
import Image from "next/image";

function NavbarLeft() {
  return (
    <Stack direction="row" alignItems="center">
      <Link href="/" title="ProperHomes">
        <Image
          src="/logo.png"
          width={200}
          height={50}
          priority
          quality={100}
          alt="logo"
          style={{ objectFit: "contain", width: "auto", height: "auto" }}
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
  );
}

export default NavbarLeft;
