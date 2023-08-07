import NextTopLoader from "nextjs-toploader";
import Stack from "@mui/material/Stack";
import DashboardNavigation from "src/components/Navbar/DashboardNav";

function DashboardLayout({ children }) {
  return (
    <Stack spacing={2}>
      <NextTopLoader showSpinner={false} />
      <DashboardNavigation />
      {children}
    </Stack>
  );
}

export default DashboardLayout;
