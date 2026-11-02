import { NextRequest, NextResponse } from "next/server";
import { generateKeywordMagicResults } from "@/lib/keywords";

export async function GET(req: NextRequest) {
  const seed = req.nextUrl.searchParams.get("seed") || "seo software";
  const results = await generateKeywordMagicResults(seed);
  return NextResponse.json({ seed, total: results.length, keywords: results });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const seed = body?.seed || "seo software";
    const results = await generateKeywordMagicResults(seed);
    return NextResponse.json({ seed, total: results.length, keywords: results });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Keyword query failed" }, { status: 500 });
  }
}
