import { useRef } from "react";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

import Add from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AddPicture = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "118px",
  height: "118px",
  borderRadius: "8px",
  cursor: "pointer",
  position: "relative",
  border: "1px solid #fff",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.common.white
      : theme.palette.common.black,
}));

export default function AddFileBlock({ onChange, file, isImageType }) {
  const ref = useRef();
  const onClick = () => {
    ref?.current?.click();
  };
  return (
    <AddPicture onClick={onClick}>
      {file?.preview ? (
        isImageType ? (
          <img
            alt=""
            src={file.preview}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: file ? 1 : 0,
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        ) : (
          <CheckCircleIcon color="info" />
        )
      ) : (
        <Add sx={{ color: "#515050" }} />
      )}

      <input
        ref={ref}
        type="file"
        hidden
        multiple
        accept={isImageType ? "image/*" : "application/pdf"}
        onChange={onChange}
        style={{
          cursor: "pointer",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
        }}
      />
    </AddPicture>
  );
}
