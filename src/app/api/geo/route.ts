import { NextRequest, NextResponse } from "next/server";
import { trackGeoAndAiVisibility } from "@/lib/geo-tracker";

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get("target") || "apex-seo";
  const query = req.nextUrl.searchParams.get("query") || undefined;
  const result = await trackGeoAndAiVisibility(target, query);
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const target = body?.target || "apex-seo";
    const query = body?.query || undefined;
    const result = await trackGeoAndAiVisibility(target, query);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "GEO tracking failed" }, { status: 500 });
  }
}
