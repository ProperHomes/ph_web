import Image from "next/image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useTheme, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import { Search } from "@mui/icons-material";
import Background from "public/assets/images/hero-image-homepage.jpeg";

// Background Image credit Unsplash: https://unsplash.com/photos/RKdLlTyjm5g

const SearchInput = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

function HomeSearch() {
  const theme = useTheme();
  return (
    <Stack sx={{ height: "500px", width: "100%", position: "relative" }}>
      <Image
        src={Background}
        fill
        style={{
          objectFit: "cover",
          objectPosition: "bottom",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      />
      <Stack px={4} py={2} sx={{ zIndex: 4, maxWidth: "600px" }}>
        <SearchInput
          color="primary"
          variant="outlined"
          placeholder="Search properties"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton sx={{color: "#fff"}}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Typography
        fontWeight={700}
        color={theme.palette.error.main}
        fontFamily={theme.typography.fontFamily.Manrope}
        mt="auto"
        mb={2}
        textAlign="center"
      >
        We will never call you unless you want us to. No Brokers are involved in
        any of the process.
      </Typography> */}
    </Stack>
  );
}

export default HomeSearch;
