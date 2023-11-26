import Link from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";
import { StyledContainer } from "@/styles/styles";

export default function AffiliateProgram() {
  return (
    <StyledContainer>
      <Stack py={4}>
        <Typography
          textAlign="center"
          variant="h1"
          color="info.main"
          fontWeight={600}
        >
          Become a ProperHomes Affiliate and Earn Lifelong Income
        </Typography>

        <Stack my={2}>
          <Typography
            sx={{
              fontSize: "1.4rem",
            }}
          >
            How it works
          </Typography>

          <Typography>Reach out to builders in your city.</Typography>
          <Typography>
            Explain about <Link href="/">ProperHomes</Link> features, benefits
            and pricing in detail.
          </Typography>

          <Typography>
            If they subscribes to one of our paid plans you get 20% of their
            monthly payment.
          </Typography>
        </Stack>

        <Button sx={{ maxWidth: "250px" }} variant="contained" color="orange">
          Join Affiliate Program
        </Button>
      </Stack>
    </StyledContainer>
  );
}
