"use client";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function EmptyContainer({ title, btnTitle, btnClick }) {
  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" width="100%">
      <Typography fontSize="1.5em" align="center">
        {title}
      </Typography>
      {btnTitle && (
        <Button variant="contained" color="info" onClick={btnClick}>
          {btnTitle}
        </Button>
      )}
    </Stack>
  );
}
