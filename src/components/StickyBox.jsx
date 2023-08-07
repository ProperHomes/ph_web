"use client";

import StickyBox from "react-sticky-box";

export default function CustomStickyBox({ children, ...props }) {
  return <StickyBox {...props}>{children}</StickyBox>;
}
