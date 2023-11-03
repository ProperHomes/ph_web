import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { InfoStack, StyledContainer } from "@/styles/styles";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

const info = [
  {
    title: "Fully Automatic Rent and Dues Collection",
    Icon: AutoFixHighIcon,
    description: `Enjoy automatic rent and dues collection each month. Let us handle the financial details so you can focus on what matters most.
    Send timely payment reminders through WhatsApp, ensuring you never miss a beat.
    `,
  },
  {
    title: "Zero Commission, Brokerage, Hidden Charges",
    Icon: MoneyOffIcon,
    description: `With our Rental Property Management App, you're in control. 
    Experience the freedom of zero brokerage, zero commissions, and zero hidden charges.
    Embrace a hassle-free approach to property management and start maximizing your returns today.`,
  },
  {
    title: "Seamless Tenant Experience",
    Icon: ContentPasteIcon,
    description: `Avoid paperwork and time waste. Our digital KYC process for tenants eliminates paperwork and saves time.
    Provide a smooth and convenient onboarding experience for your tenants. Even if its Aadhar or Police Verification.`,
  },
  {
    title: "Comprehensive Financial Reports",
    Icon: ThumbUpIcon,
    description: `Access detailed reports at your fingertips. Stay informed about dues, income, expenses, leads, tenants, and overall profit-loss.
    Make data-driven decisions for your properties with our insightful analytics.`,
  },
];

export default function PropertyManagement() {
  return (
    <StyledContainer maxWidth="xl">
      <Stack py={2}>
        <Typography
          gutterBottom
          variant="h1"
          fontSize={{ xs: "1.5rem", md: "2.5rem" }}
          textAlign="center"
          pt={2}
        >
          Manage your Rental Properties
        </Typography>
        <Typography fontSize="1.2rem" align="center" gutterBottom>
          ProperHomes dashboard will give you all the necessary tools to manage
          your every rental property and its tenants seamlesly.
        </Typography>
      </Stack>

      <Container maxWidth="lg">
        <Stack spacing={4} py={2} alignItems="center" justifyContent="center">
          {info.map(({ Icon, title, description }) => {
            return (
              <InfoStack key={title} px={4} py={2} spacing={1}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Icon fontSize="medium" />
                  <Typography fontSize="1.4rem" fontWeight="700" gutterBottom>
                    {title}
                  </Typography>
                </Stack>

                <Typography variant="body1">{description}</Typography>
              </InfoStack>
            );
          })}
          <Button
            size="large"
            variant="contained"
            disabled
            sx={{ backgroundColor: "#0080ff" }}
          >
            Manage Your Rental Properties. (coming soon)
          </Button>
        </Stack>
      </Container>
    </StyledContainer>
  );
}
