import Link from "next/link";
import BreadcrumbsMUI from "@mui/material/Breadcrumbs";
import Home from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { LISTING_TYPE } from "@/utils/constants";

function Breadcrumbs({ formattedType, listedFor, city }) {
  const isForSale = listedFor === LISTING_TYPE.SALE;

  const isPayingGuests = formattedType === "paying-guests";

  const typeWithoutHypens = formattedType.split("-").join(" ");
  const typeLink = {
    label: isPayingGuests
      ? "Paying Guests Accommodation"
      : `${typeWithoutHypens} For ${isForSale ? "Sale" : "Rent"}`,
    path: isPayingGuests
      ? "/paying-guests-accommodation"
      : `/${formattedType}-for-${isForSale ? "sale" : "rent"}`,
  };

  const links = [
    { label: "property", path: "/property" },
    typeLink,
    {
      label: city,
      path: `${typeLink.path}-in-${city?.toLowerCase()}`,
    },
  ];

  return (
    <BreadcrumbsMUI
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="medium" />}
    >
      <Link
        prefetch={false}
        color="inherit"
        href="/"
        style={{ display: "flex" }}
      >
        <Home fontSize="0.7px" />
      </Link>
      {links.map(({ label, path }, i) => {
        return (
          <Link
            key={label}
            color="inherit"
            href={path}
            prefetch={false}
            style={{ fontSize: "0.8rem" }}
          >
            {label?.toUpperCase()}
          </Link>
        );
      })}
    </BreadcrumbsMUI>
  );
}

export default Breadcrumbs;
