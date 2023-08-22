"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Stack from "@mui/material/Stack";
import { useAppContext } from "src/appContext";
import Loading from "@/components/Loading";

function DashboardLayout({ children }) {
  const router = useRouter();
  const { state } = useAppContext();
  const isLoggedIn = !!state?.user;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoggedIn) {
        router.push("/");
      }
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoggedIn, router]);

  return (
    <Stack width="100%">
      {isLoading && <Loading />}
      {children}
    </Stack>
  );
}

export default DashboardLayout;
