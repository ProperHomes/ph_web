import {
    CloudFrontClient,
    CreateInvalidationCommand,
  } from "@aws-sdk/client-cloudfront";
  import { Config } from "sst/node/config";
  
  const cloudFront = new CloudFrontClient();
  
  function invalidateCloudFrontPaths(paths) {
    cloudFront.send(
      new CreateInvalidationCommand({
        DistributionId: Config.CLOUDFRONT_DISTRIBUTION_ID,
        InvalidationBatch: {
          CallerReference: `${Date.now()}`,
          Paths: {
            Quantity: paths.length,
            Items: paths,
          },
        },
      })
    );
  }
  
  export default async function handler(req, res) {
    const validSecret = req.query.secret === Config.REVALIDATION_SECRET_KEY;
    if (!validSecret) {
      return res.status(401).json({ message: "Invalid request. Not authorized" });
    }
    if (!req.body.path) {
      return res.status(500).json({ message: "Invalid page path provided" });
    }
    try {
      await res.revalidate(req.body.path);
      invalidateCloudFrontPaths([req.body.path]);
      return res.json({ revalidated: true });
    } catch (err) {
      return res
        .status(500)
        .json({ error: { validSecret, path: req.body.path, message: err } });
    }
  }
  