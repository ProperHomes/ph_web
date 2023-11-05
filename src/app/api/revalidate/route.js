import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import { Config } from "sst/node/config";

const cloudFront = new CloudFrontClient({
  credentials: {
    accessKeyId: Config.AWS_ACCESS_KEY_ID,
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  },
});

async function invalidateCFPaths(paths) {
  await cloudFront.send(
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

export async function POST(req) {
  const body = await req.json();
  const { tag, mainPath, paths } = body;
  // if (!tag) {
  //   return NextResponse.json({ error: "tag not provided" }, { status: 500 });
  // }
  if (!mainPath) {
    return NextResponse.json(
      { error: "mainPath not provided" },
      { status: 400 }
    );
  }
  if (!paths || paths.length === 0) {
    return NextResponse.json(
      { error: "paths array is either empty or not provided" },
      { status: 400 }
    );
  }
  try {
    // revalidateTag(tag);
    revalidatePath(mainPath);
    await invalidateCFPaths(paths);
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
