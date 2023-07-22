import Image from "next/image";
import Stack from "@mui/material/Stack";
import Logo from "public/assets/images/LogoTransparent.png";

export default function Home() {
  return (
    <Stack alignItems="center" justifyContent="center">
      <Image
        src={Logo}
        alt="logo"
        style={{ maxWidth: "500px", height: "auto" }}
      />
    </Stack>
  );
}
