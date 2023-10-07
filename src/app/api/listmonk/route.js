import axios from "axios";
import { Config } from "sst/node/config";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { attribs, email, name, listIds } = body;
  if (!email || !name) {
    return NextResponse.json({ error: "required missing" }, { status: 500 });
  }
  try {
    await axios.post(
      `https://emailserver.properhomes.in/api/subscribers`,
      {
        email,
        name,
        status: "enabled",
        lists: listIds ?? [1], // default list id is 1, where every new properhomes user joins in by default
        preconfirm_subscriptions: true,
        attribs: attribs ?? {},
      },
      {
        auth: {
          username: Config.LISTMONK_USERNAME,
          password: Config.LISTMONK_PASSWORD,
        },
        headers: { "content-type": "application/json" },
      }
    );
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
}
