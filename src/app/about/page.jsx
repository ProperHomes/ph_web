import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { StyledContainer } from "@/styles/styles";

function AboutUs() {
  return (
    <StyledContainer>
      <Stack spacing={4} py={4}>
        <Typography
          variant="h1"
          textAlign="center"
          sx={{ fontSize: "2rem !important", fontWeight: 700 }}
        >
          About <Link href="/">ProperHomes</Link>
        </Typography>
        <Typography variant="h2" sx={{ fontSize: "1.2rem !important" }}>
          ProperHomes was founded in October 2024 with a mission to disrupt the
          real estate market in India. In a market saturated with
          advertisements, scams, and unverified listings, we recognized the
          urgent need for a reliable and user-centric platform. Our goal is to
          provide quality verified property listings, streamline real estate
          transactions, and ensure the safety and satisfaction of our users.
        </Typography>
        <Stack spacing={1}>
          <Typography sx={{ fontSize: "1.3rem", fontWeight: 600 }}>
            Our Founding Team
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }}>
            ProperHomes was founded by a dedicated team of real estate
            professionals who share a passion for improving the property buying
            and renting experience. With years of industry expertise, we
            understand the pain points faced by both buyers and sellers, and we
            are committed to addressing these challenges head-on.
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontSize: "1.3rem", fontWeight: 600 }}>
            Transparency and Trust
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }}>
            We firmly believe in transparency, reliability, and simplicity. At
            ProperHomes, our users are at the heart of everything we do. We
            strive to eliminate the need for brokers, agents, and middlemen,
            giving you more control and freedom in your real estate journey.
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontSize: "1.3rem", fontWeight: 600 }}>
            User Privacy
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }}>
            Your privacy and peace of mind are our top priorities. ProperHomes
            is committed to the strictest privacy and ownership standards. We
            will never spam our users. We will not contact them unless
            explicitly requested or given permission to do so. Your trust is
            paramount to us.
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontSize: "1.3rem", fontWeight: 600 }}>
            Our Future Plans
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }}>
            While we're proud of what we've achieved so far, we're also excited
            about the future. We have ambitious plans to expand our offerings in
            three key areas:
          </Typography>

          <Stack>
            <Stack spacing={1} py={2}>
              <Typography sx={{ fontSize: "1.2rem" }}>
                1. Property Services:
              </Typography>
              <Typography sx={{ fontSize: "1.2rem" }}>
                Beyond listings, we're working on a range of property services,
                including home repairs, improvements, furniture repairs,
                bathroom and kitchen cleaning, electricity repairs, and more. We
                want to ensure that your property receives the best care and
                attention it deserves.
              </Typography>
            </Stack>
            <Stack spacing={1} py={2}>
              <Typography sx={{ fontSize: "1.2rem" }}>
                2. Property Materials Marketplace:
              </Typography>
              <Typography sx={{ fontSize: "1.2rem" }}>
                Enhancing your property experience, we're developing a
                marketplace for property-related materials. This marketplace
                will make it easy for you to find high-quality products and
                services for all your real estate needs.
              </Typography>
            </Stack>
            <Stack spacing={1} py={2}>
              <Typography sx={{ fontSize: "1.2rem" }}>
                3. Property Auctions:
              </Typography>
              <Typography sx={{ fontSize: "1.2rem" }}>
                Stay tuned for an exciting addition to ProperHomes—an auction
                platform for properties. Whether you're looking to buy or sell,
                our auction feature will introduce a new dimension to the real
                estate market.
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Typography sx={{ fontSize: "1.2rem" }}>
          ProperHomes is dedicated to reshaping the real estate landscape, one
          step at a time. We are more than just a platform; we are a commitment
          to providing a better way to navigate the real estate market. Thank
          you for choosing ProperHomes. Your trust and support are what drive us
          to continually improve and serve you better.
        </Typography>
      </Stack>
    </StyledContainer>
  );
}

export default AboutUs;
