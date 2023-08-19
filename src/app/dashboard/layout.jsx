"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Stack from "@mui/material/Stack";
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

  return <Stack width="100%">{children}</Stack>;
}

export default DashboardLayout;
