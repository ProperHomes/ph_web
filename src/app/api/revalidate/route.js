// import {
//   CloudFrontClient,
//   CreateInvalidationCommand,
// } from "@aws-sdk/client-cloudfront";
import { NextResponse } from "next/server";
import { Config } from "sst/node/config";

// const cloudFront = new CloudFrontClient();

// function invalidateCloudFrontPaths(paths) {
//   cloudFront.send(
//     new CreateInvalidationCommand({
//       DistributionId: Config.CLOUDFRONT_DISTRIBUTION_ID,
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

export async function POST(req, res) {
  const body = await req.json();
  console.log("checkin g*********88", body, Config.REVALIDATION_SECRET_KEY);
  if (!body.path) {
    return NextResponse.json(
      { error: "Page path not provided" },
      { status: 500 }
    );
  }
  if (!body.secret) {
    return NextResponse.json({ error: "secret not provided" }, { status: 500 });
  }
  const validSecret = body.secret === Config.REVALIDATION_SECRET_KEY;
  if (!validSecret) {
    return NextResponse.json(
      { error: "Invalid request. Not authorized" },
      { status: 401 }
    );
  }
  try {
    process.env.__NEXT_PRIVATE_PREBUNDLED_REACT = "next";
    await res.revalidate(req.body.path);
    // invalidateCloudFrontPaths([req.body.path]);
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
}
