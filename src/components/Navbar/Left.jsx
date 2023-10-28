import Link from "next/link";
import Stack from "@mui/material/Stack";
import NavLinks from "./NavLinks";
import Image from "next/image";

function NavbarLeft() {
  return (
    <Stack direction="row" alignItems="center">
      <Link href="/">
        <Image
          src="/logo.png"
          width={200}
          height={50}
          priority
          quality={100}
          alt="logo"
          style={{ objectFit: "contain", width: "auto", height: "auto" }}
        />
      </Link>
      <NavLinks />
    </Stack>
  );
}

export default NavbarLeft;
