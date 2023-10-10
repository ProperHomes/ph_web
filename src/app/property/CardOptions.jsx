"use client";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MoreVert from "@mui/icons-material/MoreVert";

export default function CardOptionsTooltip({ open, toggleOptions, listItems }) {
  return (
    <Tooltip
      arrow
      disableHoverListener
      disableTouchListener
      open={open}
      onClose={toggleOptions}
      componentsProps={{
        tooltip: {
          sx: { padding: "2px" },
        },
      }}
      placement="bottom"
      title={
        <List dense disablePadding sx={{ background: "#121212" }}>
          {listItems.map((item) => {
            return (
              <ListItemButton
                key={item.title}
                onClick={item.onClick}
                onMouseUp={item.onClick}
                onMouseDown={item.onClick}
                sx={{
                  "&:hover": {
                    backgroundColor: "#39393a",
                  },
                }}
              >
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            );
          })}
        </List>
      }
    >
      <IconButton onClick={toggleOptions}>
        <MoreVert sx={{ color: "#fff" }} />
      </IconButton>
    </Tooltip>
  );
}
