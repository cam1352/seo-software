import { NextRequest, NextResponse } from "next/server";
import { analyzeContent } from "@/lib/content-optimizer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = body?.text || "";
    const targetKeywords = Array.isArray(body?.targetKeywords) ? body.targetKeywords : [];
    const result = analyzeContent(text, targetKeywords);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Content optimization failed" }, { status: 500 });
  }
}
