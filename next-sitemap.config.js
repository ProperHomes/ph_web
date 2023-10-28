/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://properhomes.in",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: [
    "/dashboard",
    "/dashboard/*",
    "/privacypolicy",
    "/termsAndConditions",
  ],
  // ...other options
};
