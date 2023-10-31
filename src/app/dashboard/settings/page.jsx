"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Logout from "@mui/icons-material/Logout";

import useToggleAuth from "src/hooks/useToggleAuth";
import ChangePasswordModal from "./ChangePasswordDialog";

function Settings() {
  const { logout } = useToggleAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const toggleChangePassword = () => {
    setShowChangePassword((prev) => !prev);
  };
  return (
    <Stack p={4}>
      <Stack sx={{ maxWidth: "400px" }} spacing={4}>
        <Button variant="contained" onClick={toggleChangePassword} color="primary">
          Change Password
        </Button>
        <Button
          startIcon={<Logout />}
          variant="contained"
          onClick={logout}
          color="error"
        >
          Logout
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
