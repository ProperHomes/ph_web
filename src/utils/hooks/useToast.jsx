'use client';
import { useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function useToast() {
  const [showToast, setShowToast] = useState(false);
  const [title, setTitle] = useState("");

  const toggleToast = (title) => {
    if (title) {
      setTitle(title);
    }
    setShowToast((prev) => !prev);
  };

  return {
    toggleToast,
    Toast: (
      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={toggleToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={toggleToast} severity="success" sx={{ width: "100%" }}>
          {title}
        </Alert>
      </Snackbar>
    ),
  };
}

export default useToast;
