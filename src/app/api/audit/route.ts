import { NextRequest, NextResponse } from "next/server";
import { crawlAndAudit } from "@/lib/crawler";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body?.url;
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'url' parameter" }, { status: 400 });
    }
    const result = await crawlAndAudit(url);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to audit page" }, { status: 500 });
  }
}
