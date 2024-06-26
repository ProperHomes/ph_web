import { Raleway, Damion, Manrope } from "next/font/google";

export const manRope = Manrope({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const ralewayFont = Raleway({
  weight: ["500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const DamionFont = Damion({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const USER_TYPE = {
  SELLER: "SELLER",
  BUYER: "BUYER",
  BOTH: "BOTH",
};

export const PROPERTY_TYPE = {
  LAND: "LAND",
  FLAT: "FLAT",
  VILLA: "VILLA",
  HOUSE: "HOUSE",
  // APARTMENT: "APARTMENT",
  // BUNGALOW: "BUNGALOW",
  FARM_HOUSE: "FARM HOUSE",
  // PROJECT: "PROJECT",
  COMMERCIAL: "COMMERCIAL",
  PG: "PG",
  HOSTEL: "HOSTEL",
  // ROOM: "ROOM",
};

export const LISTING_TYPE = {
  SALE: "SALE",
  RENT: "RENT",
  LEASE: "LEASE",
};

export const PROPERTY_CONDITION = {
  OK: "OK",
  GOOD: "GOOD",
  VERY_GOOD: "VERY GOOD",
  AVERAGE: "AVERAGE",
  BAD: "BAD",
};

export const PROPERTY_STATUS = {
  UNDER_CONSTRUCTION: "UNDER CONSTRUCTION",
  NOT_FOR_SALE: "NOT FOR SALE",
  NOT_FOR_RENT: "NOT FOR RENT",
  SOLD: "SOLD",
  RENTED: "RENTED",
  LEASED: "LEASED",
  READY_TO_MOVE: "READY_TO_MOVE",
};

export const LISTING_STATUS = {
  IN_REVIEW: "IN REVIEW",
  DRAFT: "DRAFT",
  REJECTED: "REJECTED",
  APPROVED: "APPROVED",
};

export const PROJECT_STATUS = {
  UNDER_CONSTRUCTION: "UNDER CONSTRUCTION",
  READY_TO_MOVE: "READY TO MOVE",
  SOLD_OUT: "SOLD_OUT",
};

export const PROPERTY_FACING = {
  EAST: "EAST",
  WEST: "WEST",
  NORTH: "NORTH",
  SOUTH: "SOUTH",
};

export const AREA_UNITS = {
  CENT: "cents",
  SQ_FT: "sq.ft",
  SQ_MT: "sq.mt",
  SQ_YARD: "sq.yard",
  ACRE: "acres",
  HECTARE: "hectares",
  GUNTHA: "guntha",
};

export const ALL_CITIES = [
  "BANGALORE",
  "CHENNAI",
  "DELHI",
  "GURGAON",
  "HYDERABAD",
  "MUMBAI",
  "PUNE",
  "VIJAYAWADA",
  "VISHAKAPATNAM",
];

export const LOCALITIES = {
  HYDERABAD: [],
  VISHAKAPATNAM: [],
  VIJAYAWADA: [],
  AMALAPURAM: [],
  BANGALORE: [],
  PUNE: [],
};

export const PRIVATE_ROUTES = [
  "/dashboard",
  "/dashboard/messages",
  "/dashboard/manage-properties",
  "/dashboard/saved-properties",
  "/dashboard/settings",
  "/dashboard/subscriptions",
];

export const navlinksSale = [
  { link: "flats-for-sale", title: "Flats For Sale" },
  { link: "villas-for-sale", title: "Villas For Sale" },
  { link: "houses-for-sale", title: "Independent Houses For Sale" },
  { link: "farm-houses-for-sale", title: "Farm Houses For Sale" },
  {
    link: "commercial-properties-for-sale",
    title: "Commercial Properties For Sale",
  },
  // {
  //   link: "bungalows-for-sale",
  //   title: "Bungalows For Sale",
  // },
  { link: "properties-for-sale", title: "Properties For Sale" },
];

export const navlinksRent = [
  { link: "flats-for-rent", title: "Flats For Rent" },
  { link: "villas-for-rent", title: "Villas For Rent" },
  { link: "houses-for-rent", title: "Independent Houses For Rent" },
  {
    link: "commercial-properties-for-rent",
    title: "Commerical Properties For Rent",
  },
  // {
  //   link: "bungalows-for-rent",
  //   title: "Bungalows For Rent",
  // },
  { link: "properties-for-rent", title: "Properties For Rent" },
  { link: "properties-for-lease", title: "Properties For Lease" },
];

export const navlinksOthers = [
  { link: "pg", title: "Paying Guest" },
  { link: "paying-guests-accommodation", title: "Paying Guest" },
  { link: "hostel-accommodation", title: "Hostels" },
  { link: "hostels", title: "Hostels" },
];

export const navlinks = [...navlinksSale, ...navlinksRent, ...navlinksOthers];

const navLinkWithCities = [];
for (let link of navlinks) {
  for (let city of ALL_CITIES) {
    navLinkWithCities.push({
      link: `${link.link}-in-${city.toLowerCase()}`,
      title: `${link.title} in ${
        city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
      }`,
      city,
    });
  }
}
export { navLinkWithCities };

export const HOME_SERVICES_LINKS = [
  { title: "Home Services", path: "home-services" },
  { title: "Home Cleaning Services", path: "home-cleaning-services" },
  { title: "Home AC Repairs Services", path: "home-repairs-services" },
  { title: "Home Painting Services", path: "home-painting-services" },
  { title: "Home Plumbing Services", path: "home-plumbing-services" },
];
