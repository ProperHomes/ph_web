import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import ContentPasteOffIcon from "@mui/icons-material/ContentPasteOff";

const infoBoxes = [
  {
    title: "Zero Brokers",
    color: "#eaf9f5",
    Icon: PersonOffIcon,
    description: (
      <Typography variant="body2">
        Contact owners directly. <b>No brokers or agents involved.</b>
      </Typography>
    ),
  },
  {
    title: "Zero Spam",
    color: "#f9f7e7",
    Icon: PhoneDisabledIcon,
    description: (
      <Typography variant="body2">
        <b>No spam calls or spam messages.</b> We'll never contact you unless
        you want us to.
      </Typography>
    ),
  },
  {
    title: "Zero Hidden Charges",
    color: "#f0f8ff",
    Icon: MoneyOffIcon,
    description: (
      <Typography variant="body2">
        We won't charge you more than what's on our pricing page.{" "}
        <b>Zero Tricks.</b>
      </Typography>
    ),
  },
  {
    title: "Zero Paperwork",
    color: "#faf6ff",
    Icon: ContentPasteOffIcon,
    description: (
      <Typography variant="body2">
        <b>100% Digital experience.</b> Even if its Aadhar or Police
        Verification. Coming Soon.
      </Typography>
    ),
  },
];

export default function ZeroBoxes() {
  return (
    <Box
      py={2}
      px={{ xs: 2, md: 0 }}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
        gap: "2em",
      }}
    >
      {infoBoxes.map(({ color, Icon, title, description }) => {
        return (
          <Stack
            key={color}
            px={4}
            py={2}
            spacing={1}
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "1rem",
              backgroundColor: color,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Icon fontSize="medium" />
              <Typography fontSize="1.4rem" gutterBottom color="info.main">
                {title}
              </Typography>
            </Stack>

            {description}
          </Stack>
        );
      })}
    </Box>
  );
}
