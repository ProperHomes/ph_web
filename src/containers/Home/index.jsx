import { useState } from "react";
import Stack from "@mui/material/Stack";
import PropertyList from "../Properties/List";
import AuthModal from "../Auth";
import HomeLayout from "@/components/Layouts/HomeLayout";

export default function Home() {
  const [openAuth, setOpenAuth] = useState(true);
  const toggleAuth = () => {
    setOpenAuth((prev) => !prev);
  };
  return (
    <HomeLayout>
      <Stack spacing={8} alignItems="center" justifyContent="center">
        <AuthModal open={openAuth} handleClose={toggleAuth} />
        <PropertyList />
      </Stack>
    </HomeLayout>
  );
}
