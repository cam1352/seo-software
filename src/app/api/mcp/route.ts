import { NextRequest, NextResponse } from "next/server";
import { getMcpManifest, handleMcpToolCall } from "@/lib/mcp-server";

export async function GET() {
  return NextResponse.json(getMcpManifest());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await handleMcpToolCall(body);
    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "MCP execution error" }, { status: 400 });
  }
}
