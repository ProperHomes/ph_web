import Image from "next/image";
import Stack from "@mui/material/Stack";
import Logo from "public/assets/images/LogoTransparent.png";
import PropertyList from "../Properties/List";
import AuthModal from "../Auth";

export default function Home() {
  return (
    <Stack
      spacing={8}
      alignItems="center"
      justifyContent="center"
      sx={{ padding: "2rem" }}
    >
      <Image
        src={Logo}
        alt="logo"
        quality={100}
        priority
        style={{ maxWidth: "300px", height: "auto" }}
      />
      <AuthModal />
      <PropertyList />
    </Stack>
  );
}
