import Stack from "@mui/material/Stack";
import DashboardNavigation from "src/app/dashboard/sidebar";

function DashboardLayout({ children }) {
  return (
    <Stack spacing={2}>
      <DashboardNavigation />
      {children}
    </Stack>
  );
}

export default DashboardLayout;
