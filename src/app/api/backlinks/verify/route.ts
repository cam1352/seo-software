import { NextRequest, NextResponse } from "next/server";
import { verifyLiveBacklink } from "@/lib/backlinks";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { backlinkUrl, targetUrl } = body;
    if (!backlinkUrl || !targetUrl) {
      return NextResponse.json({ error: "Missing 'backlinkUrl' or 'targetUrl'" }, { status: 400 });
    }

    const result = await verifyLiveBacklink(backlinkUrl, targetUrl);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Verification failed" }, { status: 500 });
  }
}
