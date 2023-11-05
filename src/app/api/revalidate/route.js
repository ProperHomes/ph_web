import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req, res) {
  const body = await req.json();
  const { tag } = body;
  if (!tag) {
    return NextResponse.json({ error: "tag not provided" }, { status: 500 });
  }
  try {
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
}
