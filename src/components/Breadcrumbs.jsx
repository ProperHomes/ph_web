import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import BreadcrumbsMUI from "@mui/material/Breadcrumbs";
import Link from "next/link";
import MUILink from "@mui/material/Link";
import Home from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Typography } from "@mui/material";

function Breadcrumbs({ links }) {
  const theme = useTheme();

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <div role="presentation" onClick={handleClick}>
      <BreadcrumbsMUI
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
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
              style={{ fontSize: "0.7rem", fontWeight: isActive ? 600 : 500 }}
            >
              {label.toUpperCase()}
            </Link>
          );
        })}
      </BreadcrumbsMUI>
    </div>
  );
}

export default Breadcrumbs;
