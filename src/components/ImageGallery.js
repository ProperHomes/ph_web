import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import ReactImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

function ImageGallery({ items, handleClose }) {
  return (
    <Modal open onClose={handleClose}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            zIndex: 2,
            top: 10,
            right: 10,
            border: "1px solid #fff",
            backgroundColor: "#fff",
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
        <ReactImageGallery showBullets items={items} showPlayButton={false} />
      </Stack>
    </Modal>
  );
}

export default ImageGallery;
