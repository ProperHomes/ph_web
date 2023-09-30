import { SSTConfig } from "sst";
import { NextjsSite, Config } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "ph-web",
      region: "ap-south-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const REVALIDATION_SECRET_KEY = new Config.Secret(
        stack,
        "REVALIDATION_SECRET_KEY"
      );
      const CLOUDFRONT_DISTRIBUTION_ID = new Config.Secret(
        stack,
        "CLOUDFRONT_DISTRIBUTION_ID"
      );
      const API_SECRET = new Config.Secret(stack, "API_SECRET");

      const site = new NextjsSite(stack, "site", {
        bind: [REVALIDATION_SECRET_KEY, CLOUDFRONT_DISTRIBUTION_ID, API_SECRET],
        customDomain: {
          domainName: "properhomes.in",
          domainAlias: "www.properhomes.in",
        },
      });
      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
