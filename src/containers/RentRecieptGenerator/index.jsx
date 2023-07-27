import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

function RentReceiptGenerator({ city }) {
  const theme = useTheme();
  return (
    <>
      <Typography
        variant="h2"
        fontSize="2rem !important"
        color={theme.palette.text.secondary}
      >
        Create Rental Receipt
      </Typography>
    </>
  );
}

export default RentReceiptGenerator;
