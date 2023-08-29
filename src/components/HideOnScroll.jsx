"use client";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

export default function HideOnScroll({ children, canHide }) {
  const trigger = useScrollTrigger();
  if (canHide) {
    return (
      <Slide appear={false} direction="down" in={!trigger} timeout={500}>
        {children}
      </Slide>
    );
  } else {
    return children;
  }
}
