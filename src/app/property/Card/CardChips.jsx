import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

function CardChips({ data }) {
  const { bedrooms, tenantId } = data;

  return (
    <Stack spacing={1}>
      {bedrooms > 0 && (
        <Box
          sx={{
            position: "absolute",
            left: 10,
            top: 15,
            zIndex: 1,
            fontWeight: "medium",
          }}
        >
          <Chip
            sx={{
              backgroundColor: "#00000050",
              "& .MuiChip-label": {
                fontWeight: 800,
              },
            }}
            color="secondary"
            label={`${bedrooms} BHK`}
          />
        </Box>
      )}

      {!!tenantId && (
        <Box
          sx={{
            position: "absolute",
            right: bedrooms > 0 ? 60 : "unset",
            left: bedrooms > 0 ? "unset" : 10,
            top: 15,
            zIndex: 1,
            fontWeight: "medium",
          }}
        >
          <Chip
            sx={{
              backgroundColor: "#00000050",
              "& .MuiChip-label": {
                fontWeight: 800,
              },
            }}
            color={isDarkMode ? "default" : "secondary"}
            label="Occupied"
          />
        </Box>
      )}
    </Stack>
  );
}

export default CardChips;
