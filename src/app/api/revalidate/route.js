import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import { NextResponse } from "next/server";
import { Config } from "sst/node/config";

const cloudFront = new CloudFrontClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: Config.AWS_ACCESS_KEY_ID,
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  },
});

async function invalidateCFPaths(paths) {
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

export async function POST(req, res) {
  const body = await req.json();
  const { paths, secret } = body;
  if (!paths) {
    return NextResponse.json(
      { error: "Page paths not provided" },
      { status: 500 }
    );
  }
  if (!secret) {
    return NextResponse.json({ error: "secret not provided" }, { status: 500 });
  }
  const validSecret = secret === Config.REVALIDATION_SECRET_KEY;
  if (!validSecret) {
    return NextResponse.json(
      { error: "Invalid request. Not authorized" },
      { status: 401 }
    );
  }
  try {
    await Promise.all(
      paths.map(async (p) => {
        await res.revalidate(p);
      })
    );
    await invalidateCFPaths(paths);
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
}
