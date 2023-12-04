import Link from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";
import { StyledContainer } from "@/styles/styles";

export default function AffiliateProgram() {
  return (
    <StyledContainer>
      <Stack p={4} justifyContent="center">
        <Typography variant="h1" color="info.main" textAlign="center" fontWeight={600}>
          Become a ProperHomes Affiliate and Earn Lifelong Income
        </Typography>

        <Stack spacing={2} py={4}>
          <Typography
            sx={{
              fontSize: "1.8rem",
            }}
          >
            How it works
          </Typography>

          <Stack spacing={2} px={1}>
            <Typography>Reach out to builders in your city.</Typography>
            <Typography>
              Explain about{" "}
              <Link href="/" style={{ textDecoration: "underline" }}>
                ProperHomes
              </Link>{" "}
              features, benefits and pricing in detail.
            </Typography>

            <Typography>
              If they buy one of our{" "}
              <Link href="/pricing" style={{ textDecoration: "underline" }}>
                paid plans
              </Link>{" "}
              you get 20% of their monthly payment.
            </Typography>
          </Stack>

          <Button
            sx={{ maxWidth: "250px" }}
            size="large"
            variant="contained"
            color="orange"
          >
            Join Affiliate Program
          </Button>
        </Stack>
      </Stack>
    </StyledContainer>
  );
}
