import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import DateRangeIcon from "@mui/icons-material/DateRange";

import useToggleAuth from "@/utils/hooks/useToggleAuth";
import Phone from "@mui/icons-material/Phone";

function SellerInfoCard({ createdAt }) {
  const theme = useTheme();
  const { isLoggedIn, toggleAuth, Auth } = useToggleAuth();
  const handleCallOwner = () => {
    if (isLoggedIn) {
      // Todo:
    } else {
      toggleAuth();
    }
  };
  return (
    <Stack
      px={2}
      py={2}
      spacing={2}
      sx={{ boxShadow: theme.shadows[2], borderRadius: "1rem" }}
    >
      <Typography
        fontSize="large"
        fontFamily={theme.typography.fontFamily.Manrope}
      >
        Interested in this property ?
      </Typography>
      <Button
        variant="contained"
        color="info"
        onClick={handleCallOwner}
        startIcon={<Phone />}
        sx={{
          fontFamily: theme.typography.fontFamily.Manrope,
          fontSize: "large",
        }}
      >
        Contact owner
      </Button>

      <Stack spacing={1} mt={2} direction="row" alignItems="center" justifyContent="center">
        <DateRangeIcon />
        <Typography>
          Listed on: {dayjs(createdAt).format("MMMM D, YYYY")}
        </Typography>
      </Stack>
      {Auth}
    </Stack>
  );
}

export default SellerInfoCard;
