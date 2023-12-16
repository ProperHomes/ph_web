import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import { Config } from "sst/node/config";

const cfClient = new CloudFrontClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: Config.AWS_ACCESS_KEY_ID,
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  },
});

async function invalidateCFPaths(paths) {
  return cfClient.send(
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
  const { path, secret } = req.body;
  if (typeof path !== "string" || !path) {
    return res.status(400).json({
      message: "Path is needed.",
    });
  }
  const validSecret = secret === Config.REVALIDATION_SECRET_KEY;
  if (!validSecret) {
    return res.status(401).json({ error: "Invalid request. Not authorized" });
  }
  try {
    await res.revalidate(path);
    await invalidateCFPaths([path, `/_next/data/${process.env.NEXT_BUILD_ID}${path}.json`]);
    return res.status(200).json({ message: `Revalidation success` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to revalidate", error: err });
  }
}
