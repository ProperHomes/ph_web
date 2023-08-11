'use client';
import { useTheme } from "@mui/material/styles";
import BreadcrumbsMUI from "@mui/material/Breadcrumbs";
import Link from "next/link";
import Home from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function Breadcrumbs({ links }) {
  const theme = useTheme();

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <div role="presentation" onClick={handleClick}>
      <BreadcrumbsMUI
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="medium" />}
      >
        <Link color="inherit" href="/" style={{ display: "flex" }}>
          <Home fontSize="0.7px" />
        </Link>
        {links.map(({ label, path }, i) => {
          const isActive = i === links.length - 1;
          return (
            <Link
              key={label}
              underline="hover"
              color={isActive ? theme.palette.info.main : "inherit"}
              href={path}
              style={{ fontSize: "0.8rem", fontWeight: isActive ? 600 : 500 }}
            >
              {label?.toUpperCase()}
            </Link>
          );
        })}
      </BreadcrumbsMUI>
    </div>
  );
}

export default Breadcrumbs;
