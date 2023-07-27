import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function SellOrRentYourProperty({ isForRent }) {
  return (
    <Stack>
      <Typography>
        {isForRent ? "Rent your property" : "Sell your property"}
      </Typography>
    </Stack>
  );
}

export default SellOrRentYourProperty;
