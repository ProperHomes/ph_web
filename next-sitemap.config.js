/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://staging.properhomes.in",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: "/*",
      },
    ],
  },
  // ...other options
};
