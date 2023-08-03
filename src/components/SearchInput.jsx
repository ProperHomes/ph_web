import { useRef } from "react";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import useKeyDown from "@/utils/hooks/useKeyDown";
import { convertStringToSlug } from "@/utils/helper";

function SearchInput() {
  const ref = useRef(null);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = () => {
    if (ref.current.value?.trim()?.length > 0) {
      const searchText = convertStringToSlug(ref.current.value);
      let path = `/search?searchText=${searchText}`;
      router.push(path);
    }
  };

  useKeyDown("Enter", handleSubmit);

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={1}
      sx={{
        width: { xs: "100%", md: "500px" },
        height: isMobile ? "40px" : "55px",
        border: "1px solid",
        borderColor: theme.palette.grey[300],
        borderRadius: isMobile ? "8px" : 0,
        transition: "0.3s ease",
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          fontSize: "1.2rem",
          fontWeight: 600,
          fontFamily: theme.typography.fontFamily.Manrope,
        }}
        inputRef={ref}
        placeholder="Eg: Flats for sale in Hyderabad"
        inputProps={{ "aria-label": "search properties" }}
      />
    </Stack>
  );
}

export default SearchInput;
