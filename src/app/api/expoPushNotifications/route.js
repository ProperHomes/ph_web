import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const reqBody = await req.json();
  const { title, body, deviceTokens } = reqBody;
  if (!title || !deviceTokens) {
    return NextResponse.json({ error: "required missing" }, { status: 500 });
  }
  try {
    await axios({
      method: "POST",
      url: `https://exp.host/--/api/v2/push/send`,
      data: JSON.stringify({
        to: deviceTokens,
        sound: "default",
        title,
        body,
        // data: data ?? {},
        priority: "high",
      }),
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
}
