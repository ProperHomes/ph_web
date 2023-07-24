import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Image from "next/image";

import Logo from "public/assets/images/LogoTransparent.png";

function HomeLayout({ children }) {
  return (
    <Container maxWidth="xl">
      <Stack py={2} spacing={8} alignItems="center" justifyContent="center">
        <Image
          src={Logo}
          alt="logo"
          quality={100}
          priority
          style={{ maxWidth: "300px", height: "auto" }}
        />
        {children}
      </Stack>
    </Container>
  );
}

export default HomeLayout;
