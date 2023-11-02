/** @type {import('next-sitemap').IConfig} */

const ALL_CITIES = [
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

const navlinksSale = [
  "flats-for-sale",
  "villas-for-sale",
  "houses-for-sale",
  "farm-houses-for-sale",
  "commercial-properties-for-sale",
  "bungalows-for-sale",
  "properties-for-sale",
];

const navlinksRent = [
  "flats-for-rent",
  "villas-for-rent",
  "houses-for-rent",
  "commercial-properties-for-rent",
  "bungalows-for-rent",
  "properties-for-rent",
  "properties-for-lease",
];

const navlinksOthers = [
  "pg",
  "paying-guests-accommodation",
  "hostel-accommodation",
  "hostels",
];

const navlinks = [...navlinksSale, ...navlinksRent, ...navlinksOthers];

const navLinkWithCities = [];
for (let link of navlinks) {
  for (let city of ALL_CITIES) {
    navLinkWithCities.push(`${link}-in-${city.toLowerCase()}`);
  }
}

const otherLinks = [
  "/explore-properties",
  "/properties-for-sale",
  "/properties-for-rent",
  "/properties-for-lease",
  "/search",
];

module.exports = {
  siteUrl: "https://www.properhomes.in",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: [
    "/dashboard",
    "/dashboard/*",
    "/privacypolicy",
    "/affiliate-program",
    "/terms-and-conditions",
  ],
  additionalPaths: () => {
    const paths = [];
    for (let link of otherLinks) {
      paths.push({
        loc: `/${link}`,
        changefreq: "hourly",
        priority: 1,
        lastmod: new Date().toISOString(),
      });
    }
    for (let link of navlinks) {
      paths.push({
        loc: `/${link}`,
        changefreq: "hourly",
        priority: 1,
        lastmod: new Date().toISOString(),
      });
    }
    for (let link of navLinkWithCities) {
      paths.push({
        loc: `/${link}`,
        changefreq: "hourly",
        priority: 1,
        lastmod: new Date().toISOString(),
      });
    }
    return paths;
  },
};
