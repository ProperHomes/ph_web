"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import ChangePasswordModal from "./ChangePasswordDialog";


function Settings() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const toggleChangePassword = () => {
    setShowChangePassword((prev) => !prev);
  };
  return (
    <Stack>
      <Stack sx={{ maxWidth: "600px" }}>
        <Button variant="contained" onClick={toggleChangePassword}>
          Change Password
        </Button>
      </Stack>

      {showChangePassword && (
        <ChangePasswordModal
          handleClose={toggleChangePassword}
          open={showChangePassword}
        />
      )}
    </Stack>
  );
}

export default Settings;
