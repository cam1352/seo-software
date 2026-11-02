import { NextRequest, NextResponse } from "next/server";
import { analyzeDomain } from "@/lib/domain-analyzer";

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get("domain") || "github.com";
  const result = await analyzeDomain(domain);
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const domain = body?.domain || "github.com";
    const result = await analyzeDomain(domain);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Domain analysis failed" }, { status: 500 });
  }
}
