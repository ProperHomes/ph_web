"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Stack from "@mui/material/Stack";
import Nav from "src/app/dashboard/nav";
import { useAppContext } from "src/appContext";

function DashboardLayout({ children }) {
  const router = useRouter();
  const { state } = useAppContext();
  const isLoggedIn = !!state?.user;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoggedIn) {
        router.push("/");
      }
    }, 2500);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoggedIn, router]);

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center" width="100%">
      <Nav />
      <Stack width="100%">{children}</Stack>
    </Stack>
  );
}

export default DashboardLayout;
