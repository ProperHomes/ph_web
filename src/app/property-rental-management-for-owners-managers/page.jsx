import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function PropertyManagement() {
  return (
    <Box>
      <Typography
        variant="h1"
        fontSize={{ xs: "1.5rem", md: "2.5rem" }}
        textAlign="center"
      >
        Easiest way to manage your Rental Properties
      </Typography>

      <Container maxWidth="lg">
        <Paper></Paper>
      </Container>
    </Box>
  );
}
