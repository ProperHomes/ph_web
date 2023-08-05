// import {
//   CloudFrontClient,
//   CreateInvalidationCommand,
// } from "@aws-sdk/client-cloudfront";
import { Config } from "sst/node/config";

// const cloudFront = new CloudFrontClient();

// function invalidateCloudFrontPaths(paths) {
//   cloudFront.send(
//     new CreateInvalidationCommand({
//       // Set CloudFront distribution ID here
//       DistributionId: distributionId,
//       InvalidationBatch: {
//         CallerReference: `${Date.now()}`,
//         Paths: {
//           Quantity: paths.length,
//           Items: paths,
//         },
//       },
//     })
//   );
// }

export default async function handler(req, res) {
  if (req.query.secret !== Config.REVALIDATION_SECRET_KEY) {
    return res.status(401).json({ message: "Invalid request. Not authorized" });
  }
  if (!req.body.path) {
    return res.status(500).json({ message: "Invalid page path provided" });
  }
  console.log("revalidating now", req.body.path);
  try {
    const res = await res.revalidate(req.body.path);
    console.log("revaldiate success", res);
    // invalidateCloudFrontPaths([req.body.path, ``]);
    return res.status(200).json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
