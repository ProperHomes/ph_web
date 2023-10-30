import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ContentPasteOffIcon from "@mui/icons-material/ContentPasteOff";

const infoBoxes = [
  {
    title: "Zero ADs",
    color: "#f9f7e790",
    Icon: ThumbUpIcon,
    description: (
      <Typography variant="body2">
        We'll never show ADs but only{" "}
        <b>100% Real Owner Verified Properties. </b>
      </Typography>
    ),
  },
  {
    title: "Zero Brokers",
    color: "#eaf9f590",
    Icon: MoneyOffIcon,
    description: (
      <Typography variant="body2">
        Contact Owners directly. <b>No brokers or agents involved.</b>
      </Typography>
    ),
  },
  {
    title: "Zero Paperwork",
    color: "#f0f8ff90",
    Icon: ContentPasteOffIcon,
    description: (
      <Typography variant="body2">
        <b>100% Digital experience.</b> Even if its Aadhar or Police
        Verification.
      </Typography>
    ),
  },
  {
    title: "Zero Spam",
    color: "#faf6ff90",
    Icon: PhoneDisabledIcon,
    description: (
      <Typography variant="body2">
        <b>No spam calls or spam messages.</b> We'll never contact you unless
        you want us to.
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
              <Typography
                variant="body2"
                fontSize="1.4rem"
                fontWeight="700"
                gutterBottom
              >
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
