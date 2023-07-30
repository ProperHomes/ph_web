import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Save from "@mui/icons-material/Save";
import Share from "@mui/icons-material/Share";

import SellerInfoCard from "./SellerInfoCard";

function Sidebar({ data }) {
  const theme = useTheme();
  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button startIcon={<Save />} fullWidth color="info">
          Save Property
        </Button>
        <Button startIcon={<Share />} fullWidth color="info">
          Share Property
        </Button>
      </Stack>

      <SellerInfoCard createdAt={data?.createdAt} />
    </Stack>
  );
}

export default Sidebar;
