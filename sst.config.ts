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
      const site = new NextjsSite(stack, "site", {
        bind: [REVALIDATION_SECRET_KEY],
        customDomain: {
          domainName: "www.properhomes.in",
          domainAlias: "properhomes.in",
        },
      });
      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
